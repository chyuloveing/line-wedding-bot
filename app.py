```python id="4mjlwm"
from flask import Flask, request
from linebot import LineBotApi, WebhookHandler
from linebot.models import MessageEvent, ImageMessage, TextSendMessage
from linebot.exceptions import InvalidSignatureError

import cloudinary
import cloudinary.uploader

import tempfile
import os

# =========================
# LINE 設定
# =========================

LINE_CHANNEL_ACCESS_TOKEN = '你的LINE_CHANNEL_ACCESS_TOKEN'

LINE_CHANNEL_SECRET = '你的LINE_CHANNEL_SECRET'

line_bot_api = LineBotApi(LINE_CHANNEL_ACCESS_TOKEN)

handler = WebhookHandler(LINE_CHANNEL_SECRET)

# =========================
# Cloudinary 設定
# =========================

cloudinary.config(
    cloud_name='你的CloudName',
    api_key='你的APIKey',
    api_secret='你的APISecret'
)

# =========================
# Flask
# =========================

app = Flask(__name__)

@app.route("/callback", methods=['POST'])
def callback():

    signature = request.headers['X-Line-Signature']

    body = request.get_data(as_text=True)

    try:
        handler.handle(body, signature)

    except InvalidSignatureError:
        return 'Invalid signature', 400

    return 'OK'


# =========================
# 接收圖片
# =========================

@handler.add(MessageEvent, message=ImageMessage)
def handle_image(event):

    try:

        message_content = line_bot_api.get_message_content(
            event.message.id
        )

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix='.jpg'
        ) as tf:

            for chunk in message_content.iter_content():
                tf.write(chunk)

            temp_path = tf.name

        # 上傳 Cloudinary
        result = cloudinary.uploader.upload(
            temp_path,
            folder='wedding'
        )

        image_url = result['secure_url']

        os.remove(temp_path)

        line_bot_api.reply_message(
            event.reply_token,
            TextSendMessage(
                text=
f'''📸 照片已上傳成功 ❤️

🔗 照片網址：
{image_url}

感謝分享婚禮回憶 ✨'''
            )
        )

    except Exception as e:

        line_bot_api.reply_message(
            event.reply_token,
            TextSendMessage(
                text=f'❌ 上傳失敗\n{str(e)}'
            )
        )


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)
```
