// 获取主题切换按钮和body元素
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 主题切换功能
themeToggle.addEventListener('click', () => {
    // 切换深色模式类
    body.classList.toggle('dark-mode');
    
    // 更新主题图标
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// 平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 北京时间显示功能
function updateBeijingTime() {
    // 获取时间显示元素
    const timeElement = document.querySelector('#beijing-time span');
    // 设置时间格式选项
    const options = {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    // 更新时间的函数
    function update() {
        const beijingTime = new Date().toLocaleString('zh-CN', options);
        timeElement.textContent = beijingTime;
    }

    // 立即更新一次时间
    update();
    // 每秒更新一次时间
    setInterval(update, 1000);
}

// 当页面加载完成后启动时钟
document.addEventListener('DOMContentLoaded', updateBeijingTime);

// 音乐控制功能
document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isInitialized = false;

    // 音乐控制函数
    function toggleMusic() {
        try {
            if (!isInitialized) {
                // 第一次点击时加载音频
                backgroundMusic.load();
                isInitialized = true;
            }

            if (backgroundMusic.paused) {
                // 播放音乐
                let playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // 播放成功
                        musicToggle.classList.add('playing');
                    })
                    .catch(error => {
                        // 播放失败
                        console.error('播放失败:', error);
                        alert('音乐播放失败，请检查音频文件是否存在');
                    });
                }
            } else {
                // 暂停音乐
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
            }
        } catch (error) {
            console.error('音乐控制错误:', error);
        }
    }

    // 添加点击事件监听器
    musicToggle.addEventListener('click', toggleMusic);

    // 处理音频加载错误
    backgroundMusic.addEventListener('error', function(e) {
        console.error('音频加载错误:', e);
        alert('音频文件加载失败，请检查文件路径是否正确');
        musicToggle.style.display = 'none';
    });
});

// 添加滚动监听
document.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// 优化图片加载
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});

// 添加滚动显示动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// 添加点击波纹效果
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    ripple.className = 'ripple';
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// 添加全局错误处理
window.addEventListener('error', (event) => {
    console.error('页面错误:', event.error);
    // 可以添加错误上报逻辑
});

// 优化图片加载失败处理
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        this.src = './tupian/fallback.jpg';
        this.alt = '图片加载失败';
    };
}); 