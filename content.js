const trapKeywords = [
    "subscribe", "berlangganan", "newsletter", "asuransi",
    "insurance", "protection", "proteksi", "auto-renew",
    "perpanjang otomatis", "agree to receive", "biaya tambahan",
    "donasi", "tip", "promo"
];

function scanForDarkPatterns() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let detectedCount = 0;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked && !checkbox.dataset.dpScanned) {
            checkbox.dataset.dpScanned = "true";

            const container = checkbox.closest("label") || checkbox.parentElement;
            if (!container) return;

            const textContent = container.innerText.toLowerCase();
            const isTrap = trapKeywords.some((keyword) => textContent.includes(keyword));

            if (isTrap) {
                detectedCount++;
                container.classList.add("dp-shield-highlight");

                const badge = document.createElement("span");
                badge.className = "dp-shield-badge";
                badge.innerText = "[!] Jebakan Opt-in Terdeteksi";
                container.appendChild(badge);
            }
        }
    });

    if (detectedCount > 0) {
        console.log(`[DrkPattern Shield] Menemukan ${detectedCount} potensi jebakan.`);
    }
}

scanForDarkPatterns();
const observer = new MutationObserver(() => scanForDarkPatterns());
observer.observe(document.body, { childList: true, subtree: true });

