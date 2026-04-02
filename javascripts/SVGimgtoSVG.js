// Inline <img class="svg"> to <svg> safely, preserving attributes for modals, etc.
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('img.svg').forEach(function (img) {
		// 可用 data-no-inline-svg 來跳過某些圖片
		if (img.hasAttribute('data-no-inline-svg')) return;

		var imgURL   = img.currentSrc || img.src;
		var imgTitle = img.getAttribute('title');
		var imgAlt   = img.getAttribute('alt');

		fetch(imgURL)
			.then(function (res) { return res.text(); })
			.then(function (text) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(text, 'image/svg+xml');
				var svg = xmlDoc.getElementsByTagName('svg')[0];
				if (!svg) return;

				// 先移除舊的 <title>/<desc>
				var oldTitle = svg.querySelector('title');
				if (oldTitle) oldTitle.remove();
				var oldDesc = svg.querySelector('desc');
				if (oldDesc) oldDesc.remove();

				// *** 修復點：只複製安全的屬性，避免干擾其他腳本 ***
				var safeAttributes = [
					'class', 'style', 'data-*', 'aria-*',
					'width', 'height', 'alt', 'title'
				];

				Array.from(img.attributes).forEach(function (attr) {
					var name = attr.name;

					// 跳過這些可能有問題的屬性
					if (name === 'src' || name === 'srcset' || name === 'loading' ||
						name === 'decoding' || name === 'id' || name.startsWith('on')) {
						return;
					}

					// 只保留安全屬性
					var isSafe = safeAttributes.some(function(safe) {
						return safe === name ||
							   (safe.endsWith('*') && name.startsWith(safe.slice(0, -1)));
					});

					if (isSafe) {
						svg.setAttribute(name, attr.value);
					}
				});

				// 標記一下已替換
				svg.classList.add('replaced-svg');

				// 無障礙／焦點行為
				svg.setAttribute('role', 'img');
				svg.setAttribute('focusable', 'false');
				svg.setAttribute('tabindex', '-1');
				if (imgAlt && !svg.hasAttribute('aria-label')) {
					svg.setAttribute('aria-label', imgAlt);
				}

				// 用 <title>/<desc> 保存文字
				if (imgTitle) {
					var t = document.createElementNS('http://www.w3.org/2000/svg', 'title');
					t.textContent = imgTitle;
					svg.insertBefore(t, svg.firstChild);
				}
				if (imgAlt) {
					var d = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
					d.textContent = imgAlt;
					svg.insertBefore(d, svg.firstChild);
				}

				// 移除不必要命名空間
				svg.removeAttribute('xmlns:a');

				// 補 viewBox（若 SVG 只有寬高）
				if (!svg.getAttribute('viewBox')) {
					var w = svg.getAttribute('width');
					var h = svg.getAttribute('height');
					if (w && h) svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
				}

				// *** 修復點：確保 SweetAlert 相關元素不受影響 ***
				// 檢查替換前是否有 SweetAlert 依賴的元素
				var hasModalContext = img.closest('.swal2-container, .swal2-popup, [data-swal], [id*="swal"]');
				if (hasModalContext) {
					console.warn('[inline-svg] Skipping SVG conversion in SweetAlert context to avoid conflicts');
					return;
				}

				// 以 <svg> 取代 <img>
				img.replaceWith(svg);
			})
			.catch(function (err) {
				// 有跨網域/CORS 問題或解析失敗時，保持原狀
				console.error('[inline-svg] failed:', err);
			});
	});
});