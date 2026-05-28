module main

import crypto.aes
import crypto.cipher
import encoding.base64
import net.http
import x.json2 as json

const aes_key = 'tospinomallkeyiv'
const aes_iv = 'tospinomallkeyiv'

struct TokenData {
	access_token string @[json: 'access_token']
}

struct LoginResponse {
	code int       @[json: 'code']
	msg  string    @[json: 'msg']
	data TokenData @[json: 'data']
}

fn encrypt_password(password string) string {
	// 确保长度
	mut fixed_key := []u8{len: 16, init: 0}
	mut fixed_iv := []u8{len: 16, init: 0}
	for i in 0 .. 16 {
		if i < aes_key.len {
			fixed_key[i] = aes_key[i]
		}
		if i < aes_iv.len {
			fixed_iv[i] = aes_iv[i]
		}
	}

	block := aes.new_cipher(fixed_key)
	mut cbc := cipher.new_cbc(block, fixed_iv)

	// PKCS7填充S
	mut plaintext := password.bytes()
	padding := 16 - (plaintext.len % 16)
	for _ in 0 .. padding {
		plaintext << u8(padding)
	}

	mut encrypted := []u8{len: plaintext.len}
	cbc.encrypt_blocks(mut encrypted, plaintext)

	return base64.encode(encrypted)
}

fn login() !string {
	encrypted_password := encrypt_password('123456')
	println('原始密码：123456')
	println('加密后：${encrypted_password}')

	data := 'username=apm001&password=${encrypted_password}'

	mut req := http.new_request(.post,
		'https://oauthapi-test.tospinomall.com/auth/oauth/token?grant_type=password', data)

	req.add_custom_header('Authorization', 'Basic b3BlcmF0b3I6b3BlcmF0b3I=')!
	req.add_custom_header('Content-Type', 'application/x-www-form-urlencoded')!
	req.add_custom_header('ClientType', 'web')!
	req.add_custom_header('Language', 'zh-CN')!
	req.add_custom_header('Site', 'ghana')!

	resp := req.do() or { return error('请求失败：${err}') }

	if resp.status_code != 200 {
		return error('HTTP错误：${resp.status_code}')
	}

	result := json.decode[LoginResponse](resp.body) or {
		return error('解析响应失败：${err}')
	}

	if result.code != 0 {
		return error('登录失败：${result.msg}')
	}

	return result.data.access_token
}

fn main() {
	token := login() or {
		eprintln('错误：${err}')
		exit(1)
	}
	println('\n获取到 token: ${token}')
}
