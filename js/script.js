/**
 * 滾動進度條
 * 監聽頁面滾動事件，動態更新進度條寬度
 */
(function () {
  const progressBar = document.getElementById('scrollProgressBar');

  /**
   * 更新進度條寬度
   * 根據視窗滾動位置計算進度百分比
   */
  function updateProgressBar() {
    try {
      if (!progressBar) {
        return;
      }

      // 計算滾動百分比
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled =
        windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;

      // 更新進度條寬度
      progressBar.style.width = scrolled + '%';
    } catch (error) {
      console.warn('進度條更新失敗:', error);
    }
  }

  // 監聽滾動事件
  window.addEventListener('scroll', updateProgressBar);

  // 首次加載時更新
  updateProgressBar();
})();

/**
 * 滾動淡入動畫
 * 使用 IntersectionObserver 監聽區塊進入視窗
 */
(function () {
  try {
    var targets = document.querySelectorAll(
      '.section, .timeline-item, header'
    );
    if (!targets.length || !('IntersectionObserver' in window)) {
      // 不支援 Observer 時直接顯示
      for (var i = 0; i < targets.length; i++) {
        targets[i].classList.add('visible');
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  } catch (error) {
    console.warn('淡入動畫初始化失敗:', error);
    // 降級：直接顯示
    var fallback = document.querySelectorAll(
      '.section, .timeline-item, header'
    );
    for (var k = 0; k < fallback.length; k++) {
      fallback[k].classList.add('visible');
    }
  }
})();

/**
 * 心理分析標籤切換功能
 * 切換中立醫療版、毒辣版、終極毒辣版的顯示面板
 * @param {string} tabId - 標籤識別碼 ('neutral' | 'spicy' | 'ultimate')
 */
function switchAnalysisTab(tabId) {
  try {
    // 移除所有面板的 active 狀態
    var panels = document.querySelectorAll('.analysis-tab-panel');
    for (var i = 0; i < panels.length; i++) {
      panels[i].classList.remove('active');
    }

    // 移除所有按鈕的 active 狀態
    var btns = document.querySelectorAll('.analysis-tab-btn');
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.remove(
        'active',
        'active-spicy',
        'active-ultimate'
      );
    }

    // 啟用對應面板
    var targetPanel = document.getElementById('tab-' + tabId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }

    // 啟用對應按鈕並套用對應顏色
    var targetBtn = document.querySelector(
      '.analysis-tab-btn[data-tab="' + tabId + '"]'
    );
    if (targetBtn) {
      if (tabId === 'spicy') {
        targetBtn.classList.add('active-spicy');
      } else if (tabId === 'ultimate') {
        targetBtn.classList.add('active-ultimate');
      } else {
        targetBtn.classList.add('active');
      }
    }

    console.log('已切換至分析標籤:', tabId);
  } catch (error) {
    console.error('標籤切換失敗:', error);
  }
}