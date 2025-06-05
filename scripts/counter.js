(function() {
    // Отслеживание времени входа и времени на сайте
    const startTime = Date.now();

    // Количество кликов
    let clickCount = 0;

    // Отслеживание кликов
    document.addEventListener('click', () => clickCount++);

    // Отслеживание переходов по страницам (SPA или стандартная навигация)
    window.addEventListener('beforeunload', sendStats);

    // Собрать данные и отправить на сервер
    async function sendStats() {
        const endTime = Date.now();
        const duration = Math.round((endTime - startTime) / 1000);

        // Получить IP через бесплатный API (можно менять сервис)
        let ipData = {};
        try {
            ipData = await fetch('https://ip-api.io/json').then(r => r.json());
        } catch (e) {}

        const data = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screen: { w: window.screen.width, h: window.screen.height },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            referrer: document.referrer,
            url: window.location.href,
            clicks: clickCount,
            sessionDuration: duration,
            ip: ipData.ip,
            country: ipData.country_name,
            city: ipData.city,
            asn: ipData.asn,
            date: new Date().toISOString()
        };

        // Отправить на бэкенд
        navigator.sendBeacon('http://5.23.54.56:3000/collect', JSON.stringify(data));
    }
})();
