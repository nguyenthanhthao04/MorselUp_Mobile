# MorselUp — React Native

Giao diện native chuyển từ file Figma `fOZgqu5TpIHe99Nc8UdRNp`, với khung tham chiếu **428 × 926**. Dự án dùng Expo SDK 58, React Native 0.88 và font Inter và Sour Gummy được đóng gói trong ứng dụng.

Inter dùng bản OTF **3.19** từ [bản phát hành chính thức](https://github.com/rsms/inter/releases/tag/v3.19), đã đối chiếu trực tiếp với ảnh Figma. File nguyên gốc, nguồn tải và giấy phép nằm trong `assets/fonts/inter-3.19`. Không thay bằng Inter 4.001 nếu chưa đo lại vì khác metrics và hình dạng chữ.

## Chạy trên máy ảo Android

```powershell
npm install
npm run android -- --port 8084
```

Mở máy ảo Android trước khi chạy lệnh. Dự án tương thích Expo Go SDK 58. Trên máy hiện tại đã có AVD `Phone_428x926` (428 × 926, density 160). Metro đang dùng cổng 8084 để tránh các dự án khác đang chiếm cổng 8081.

Nếu chạy Metro bằng `npm start -- --port 8084`, có thể mở dự án trong Expo Go qua `exp://127.0.0.1:8084` sau khi chạy `adb reverse tcp:8084 tcp:8084`.

## Phạm vi hiện tại

Chỉnh sửa theo yêu cầu tác giả: màn `16:14663` chỉ giữ ảnh `16:14681`, bỏ placeholder low-fi cũ (`16:14675`–`16:14678`). Cấu hình trong `design/excluded-nodes.json` được áp dụng khi biên dịch lại. Ảnh xác nhận: `verification/location-only-image.png`. Các số đo SSIM của lần rà soát trước dùng thiết kế Figma nguyên bản, trước chỉnh sửa này.

Màn `16:14726` cũng đã bỏ các layer low-fi `16:14745`, `16:14746`, `16:14747`, `16:14748`, `16:14753`; giữ ảnh bản đồ `16:14754`. Ảnh xác nhận: `verification/address-only-map.png`.

Kết quả lần rà soát mới nhất: **423/423 vùng bấm có action đạt**, **15/15 thao tác đóng overlay/Back đạt**; đã đối chiếu đủ **142 frame**. SSIM trung bình **98,35%**, **105/142 frame** đạt ≥98%; **37 frame còn dưới ngưỡng** (thấp nhất 96,56%). Chưa chứng nhận mọi giao diện đạt 98%. Xem [báo cáo và ảnh từng frame](verification/AUDIT.md).

- **142/142 frame** đã lấy được code, thông số và ảnh tham chiếu chi tiết từ Figma MCP và chuyển sang mô tả native.
- `design/missing-frames.json` hiện rỗng. Bảng theo dõi từng frame nằm trong `design/COVERAGE.md`.
- 1.270 ảnh/SVG gốc được tải về `assets/figma`; 1.580 vị trí sử dụng asset có ánh xạ layer trong báo cáo kiểm tra.
- Các màn hình dài cuộn trong viewport 428 × 926; thanh điều hướng dưới được ghim ở đáy viewport.
- Điều hướng dùng dữ liệu prototype gốc trong `design/prototype.json`: 142 frame, 430 vùng tương tác và 435 reaction. Các đường đi dựa trên ID layer, không suy đoán từ nhãn nút. Hỗ trợ NAVIGATE, OVERLAY, BACK và CLOSE, vị trí overlay, nền tối và đóng khi chạm bên ngoài.
- Vùng bấm nằm trong nội dung cuộn được gắn vào đúng ScrollView; reaction rỗng không che action của nút cha.
- Hai menu đặt thủ công dùng vị trí nút thực tế sau khi cuộn; kiểm tra bổ sung trong `verification/manual-overlay-scroll.json`.
- Đây là bản giao diện với dữ liệu mẫu từ Figma, chưa có backend, OTP, đăng nhập mạng xã hội, cuộc gọi hay xử lý giao dịch thực.

**Mục tiêu 98% được kiểm tra theo từng frame, chưa mặc định đạt**. Kết quả mới nhất nằm trong `verification/visual-audit.json`; `all_frames_pass` chỉ đúng khi đủ 142 frame và từng frame đạt SSIM ≥ 0,98. Ảnh Figma gốc 1× nằm trong `verification/figma-1x`; ảnh so sánh Figma / Android / sai khác nằm trong `verification/comparison`. Nội dung dài được ghép từ các ảnh chụp cuộn có vùng chồng lấp. Chỉ loại khỏi phép đo nút Tools và tooltip của Expo Go.

Máy ảo được kiểm tra ở **428×926 dp, mật độ 3×** (1284×2778 pixel), sau đó chuẩn hóa ảnh về 1× để so sánh Figma. Có thể đặt bằng `adb shell wm size 1284x2778` và `adb shell wm density 480`; mở lại Expo Go sau khi đổi mật độ. Tọa độ layer, nhóm và stroke bên trong được bảo toàn để tránh sai lệch do Yoga làm tròn hoặc tính stroke vào padding.

Một số reaction trong chính Figma có action rỗng hoặc không có destination. Ứng dụng giữ nguyên trạng thái ở các trường hợp đó; danh sách có trong báo cáo điều hướng. Metadata transition/easing được lưu để truy vết; hiệu ứng chuyển cảnh chi tiết/Smart Animate chưa được tái tạo ở mức layer.

Nhấn giữ logo **MorselUp** để mở danh sách rà soát màn hình. Trên web, nhấn `g`. Danh sách hiển thị cả các frame chưa lấy được dữ liệu, nhưng không cho mở frame còn thiếu. Có thể mở trực tiếp một màn hình trên web bằng `?screen=16%3A15184` hoặc dùng deep link Expo `exp://127.0.0.1:8084/--/?screen=16%3A15184`.

## Cấu trúc

- `App.tsx`: vùng bấm từ prototype, stack overlay, viewport chuẩn, thanh điều hướng ghim, danh sách rà soát.
- `src/prototype.ts`: trạng thái điều hướng thuần từ action của Figma; `design/prototype.json` giữ toàn bộ reaction nguồn.
- `src/NativeDesign.tsx`: thành phần React Native dùng chung cho view, chữ, ảnh, SVG, nút và ô nhập.
- `src/theme.ts`: màu và kích thước nền tảng.
- `src/generated/screens.json`: mô tả native của 142 frame, biên dịch từ phản hồi Figma chi tiết.
- `src/components/LocationPermissionAlert.tsx`: adapter của node Code Connect `16:22656`. Phản hồi Figma cung cấp cấu trúc Alert của thư viện iOS/iPadOS 26 nhưng không có module React Native có thể import; adapter giữ đúng vị trí layer và hợp đồng lựa chọn. Phần tiêu đề/bản đồ vẫn dùng nguyên layer và asset gốc bên ngoài adapter.
- `design/*.jsx`: phản hồi nguồn Figma để truy vết; không được import vào ứng dụng.
- `scripts/compile-design.cjs`: chuyển các thông số Figma sang style/layout native; có thể chạy lại bằng `npm run compile-design`.
- `assets/figma/*.svgdata`: bản sao **nguyên byte** của SVG gốc, giúp Metro đóng gói được các SVG có kích thước dưới 1 px mà không sửa width/height hoặc path của asset.
- `design/asset-aliases.json`: 702 tệp trùng hoàn toàn dùng chung nguồn native; SHA-256 của bản gốc và bản dùng chung phải giống hệt. Còn 568 nguồn duy nhất; mọi file gốc và 1.580 vị trí sử dụng vẫn được giữ.
- `assets/svg-cache` và `src/svg-cache.ts`: cache 3× dựng trực tiếp từ 22 SVG có filter để giảm chi phí dựng filter native; không thay đổi artwork hoặc kích thước nội tại. Tạo lại bằng `npm run cache:svg`. [Issue về chi phí SVG filter](https://github.com/software-mansion/react-native-svg/issues/2687).
- `src/generated/nested-hotspots.json`: ánh xạ vùng bấm vào 5 vùng cuộn bên trong frame; tạo bằng `scripts/compile-prototype.cjs`.
- `verification/`: ảnh chụp Android, ảnh đối chiếu và báo cáo asset. Ảnh chụp Figma chỉ dùng kiểm tra, không dùng làm giao diện ứng dụng.

## Kiểm tra

```powershell
npm run typecheck
node scripts/audit-assets.cjs
```

Khi Metro ở cổng 8084 và ứng dụng đang mở trong máy ảo:

```powershell
node scripts/verify-android.cjs
python -X utf8 scripts/compare-all.py
node scripts/audit-navigation.cjs
node scripts/audit-svg-cache.cjs
```

Script Android dùng ADB và debugger cục bộ để mở từng frame, chờ SVG, chụp cả nội dung cuộn và ghi hình học asset vào `verification/android-results.json`. Script điều hướng chạm thật từng vùng bấm, kiểm tra đúng layer nhận chạm, màn hình đích và stack overlay; ghi `verification/navigation-audit.json`. Chạy hai script này lần lượt vì cùng điều khiển máy ảo. Có thể đặt `ADB_PATH` nếu Android SDK ở vị trí khác. Script Python cần Pillow, NumPy và scikit-image.

Ảnh tham chiếu mới được xuất trực tiếp ở scale 1, không phóng lớn thumbnail 1024 px. `node scripts/summarize-verification.cjs` tổng hợp độ phủ màn hình, asset và trạng thái SVG. Các script/ảnh đối chiếu cũ của ba màn hình chỉ là lịch sử; dùng `visual-audit.json` cho lần kiểm tra mới.

`node scripts/stress-assets.cjs` đã chạy 202 lần chuyển màn hình liên tiếp trên cùng tiến trình sau tối ưu tài nguyên, không có lỗi JS hoặc thoát tiến trình. Bộ nhớ PSS trong đợt debug vẫn tăng (báo cáo `verification/memory-stress.json`); kết quả này chưa chứng nhận đã xử lý triệt để vấn đề bộ nhớ hoặc hiệu năng của bản release.

Tài liệu nền tảng: [Expo SDK 58 NavigationBar](https://docs.expo.dev/versions/v58.0.0/sdk/navigation-bar/), [Expo fonts](https://docs.expo.dev/develop/user-interface/fonts/).
