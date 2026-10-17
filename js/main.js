document.addEventListener('DOMContentLoaded', function() {
    console.log('9uu 平台前端脚本已成功加载');

    // 移动端导航菜单切换控制
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const isExpanded = mainNav.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // 动态交互：点赞功能统计
    const likeButtons = document.querySelectorAll('.btn-like');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countSpan = this.querySelector('.like-count');
            let currentCount = parseInt(countSpan.textContent, 10);
            
            if (this.classList.contains('liked')) {
                currentCount -= 1;
                this.classList.remove('liked');
                this.style.color = '';
            } else {
                currentCount += 1;
                this.classList.add('liked');
                this.style.color = '#ff4757';
            }
            countSpan.textContent = currentCount;
        });
    });

    // 表单验证：联系我们页面表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const formFeedback = document.getElementById('formFeedback');

            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                showFeedback(formFeedback, '请完整填写所有必填字段后再提交。', 'error');
                return;
            }

            // 模拟表单异步提交过程
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = '正在发送...';

            setTimeout(function() {
                submitButton.disabled = false;
                submitButton.textContent = '确认提交留言';
                contactForm.reset();
                showFeedback(formFeedback, '您的留言已成功提交，我们的运营团队会在 24 小时内通过邮件与您取得联系。', 'success');
            }, 1000);
        });
    }

    function showFeedback(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.className = 'form-feedback ' + type;
        element.style.display = 'block';

        setTimeout(function() {
            element.style.display = 'none';
        }, 5000);
    }

    // 社区讨论板块实时滚动刷新模拟
    const communityFeed = document.querySelector('.community-feed-list');
    if (communityFeed) {
        // 每隔 30 秒模拟一条新动态提醒
        setInterval(function() {
            const notificationBadge = document.createElement('div');
            notificationBadge.className = 'new-post-alert';
            notificationBadge.innerHTML = '有新的社区讨论发布，<a href="community.html">点击查看最新内容</a>';
            notificationBadge.style.cssText = 'background: #eef2ff; color: #4f46e5; padding: 8px 12px; margin-bottom: 15px; border-radius: 4px; font-size: 13px; text-align: center; cursor: pointer;';
            
            notificationBadge.addEventListener('click', function() {
                window.location.href = 'community.html';
            });

            if (!document.querySelector('.new-post-alert')) {
                communityFeed.insertBefore(notificationBadge, communityFeed.firstChild);
            }
        }, 30000);
    }

    // 使用安全的方式动态添加样式与广告弹窗内容（替代已废弃的 document.write）
    const styleElem = document.createElement('style');
    styleElem.innerHTML = `
        .ad { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; background: #fff; overflow: hidden; clear: both; border-radius: 6px; margin: 0 0 10px 0; text-align: center; padding: 10px; }
        .ad-ti { font-size: 24px; margin: 5px 0 10px 0; color: #333; background: #FFE4E1; padding: 6px; border-radius: 60px; }
        .ad li { width: 100%; list-style: none; margin-bottom: 5px; }
        .ad a.myButton { display: flex; align-items: center; justify-content: center; width: 80vw; margin: auto; height: 55px; color: #fff; background: #01AAED; font-size: 3vw; text-decoration: none; border-radius: 3px; padding: 0 20px; transition: background-color .3s; box-sizing: border-box; overflow: hidden; }
        .nav-icon { height: 80%; max-height: 30px; width: auto; flex-shrink: 0; }
        .ad a.myButton:hover { background: #FFE4E1; color: #333; }
        #fullScreenImage { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; height: 100%; object-fit: cover; z-index: 9999; background-color: rgba(192,192,192,1.9); }
        @media(max-width:600px) {
            .ad a.myButton { height: 48px; width: 80vw; font-size: 3.6vw; }
            .nav-icon { height: 75%; max-height: 38px; }
            .ad-ti { font-size: 4.5vw; }
        }
    `;
    document.head.appendChild(styleElem);

    const adContainer = document.createElement('div');
    adContainer.className = 'ad';
    adContainer.innerHTML = `
        <h2 class="ad-ti">超级精品联盟</h2>
        <ul>
            <li><a class="myButton" href="https://99.loooo.fun" rel="nofollow" target="_blank"><img src="/tu2/lo.webp" class="nav-icon">➦</a></li>
            <li><a class="myButton" href="https://haijiao1.aa545.club" rel="nofollow" target="_blank"><img src="/tu2/hai.webp" class="nav-icon">➦</a></li>
            <li><a class="myButton" href="https://hanxiu.mm545.club" rel="nofollow" target="_blank"><img src="/tu2/han.webp" class="nav-icon">➦</a></li>
        </ul>
    `;
    document.body.appendChild(adContainer);

    var img = document.createElement("img");
    img.id = "fullScreenImage";
    document.body.appendChild(img);
});
