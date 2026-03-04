from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rooms')
def rooms():
    return render_template('rooms.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/reserve', methods=['GET', 'POST'])
def reserve():
    if request.method == 'POST':
        # 予約ボタンが押されたら、サクセスページへ移動（type=reserve という印を付与）
        return redirect(url_for('success', type='reserve'))
    
    # URLパラメータから部屋とコースを取得（客室ページからの遷移用）
    selected_room = request.args.get('room', '')
    selected_course = request.args.get('course', '')
    
    return render_template('reserve.html', room=selected_room, course=selected_course)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # 送信ボタンが押されたら、サクセスページへ移動（type=contact という印を付与）
        return redirect(url_for('success', type='contact'))
        
    return render_template('contact.html')

# 新しく追加：サクセスページを表示するための設定
@app.route('/success')
def success():
    # templatesフォルダの中の success.html を画面に表示する
    return render_template('success.html')

if __name__ == '__main__':
    app.run(debug=True)