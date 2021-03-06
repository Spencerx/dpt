export default class ProgressBar {
    constructor(value = 0) {
        this.value = value;
        this.dom = document.createElement('div');

        Object.assign(this.dom.style, {
            position: 'absolute',
            left: 0,
            top: 0,
            height: '3px',
            backgroundColor: '#ccc',
            transition: 'width 0.2s'
        });

        document.body.style.visibility = 'hidden';
        document.body.appendChild(this.dom);
        this.dom.style.visibility = 'visible';
        this.render();
    }

    render() {
        this.dom.style.width = this.value * 100 + '%';
    }

    setValue(value) {
        this.value = value;
        this.render();
    }

    increment() {
        let remaining = 1 - this.value;
        this.setValue(this.value + remaining * 0.1);
    }

    autoincrement(interval = 200) {
        this.timer = setInterval(() => this.increment(), interval);
    }

    complete() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.dom.style.transition = 'width 0.01s';
        this.setValue(1);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.dom.remove();
                document.body.style.visibility = 'visible';
                resolve();
            }, 30);
        });
    }
}
