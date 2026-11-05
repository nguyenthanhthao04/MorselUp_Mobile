const fs=require('fs'),path=require('path');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const visual=read('verification/visual-audit.json'),nav=read('verification/navigation-audit.json'),assets=read('verification/summary.json'),reach=read('verification/prototype-reachability.json'),cache=read('verification/svg-cache-audit.json');
const memory=fs.existsSync('verification/memory-stress.json')?read('verification/memory-stress.json'):null;
const frames=Object.fromEntries(read('design/frames.json').map(f=>[f.id,f]));
const pct=n=>(n*100).toFixed(2)+'%';
const failed=visual.results.filter(r=>!r.passes_98_ssim).sort((a,b)=>a.ssim-b.ssim);
const dismissals=nav.dismissals.filter(d=>d.passed).length;
const root=path.resolve('.').replaceAll('\\','/');
const rows=failed.map(r=>`| ${r.id} | ${frames[r.id].name.replaceAll('|','/')} | ${pct(r.ssim)} | [Ảnh đối chiếu](${root}/verification/comparison/${r.id.replace(':','-')}.png) |`).join('\n');
const markdown=`# Đối chiếu prototype và giao diện Figma

Nguồn: [Figma high](https://www.figma.com/design/fOZgqu5TpIHe99Nc8UdRNp/high?node-id=0-1). Kiểm tra trên Android tại **428 × 926 dp**, mật độ 3× (1284 × 2778 pixel).

| Nội dung | Kết quả |
|---|---|
| Vùng bấm có action thực thi | **${nav.passed}/${nav.executableHotspots} đạt**, ${nav.failed} lỗi |
| Đóng overlay bằng chạm ngoài / Back Android | **${dismissals}/${nav.dismissals.length} đạt** |
| Vùng bấm bị che hoặc nằm ngoài khả năng kiểm tra | ${nav.occluded.length} / ${nav.outside.length} |
| Frame có ảnh tham chiếu gốc và ảnh Android | **${visual.compared}/142** |
| SSIM trung bình | **${pct(visual.mean_ssim)}** |
| Frame đạt SSIM ≥ 98% | **${visual.passed}/142** |
| SSIM thấp nhất | **${pct(visual.minimum_ssim)}** |
| Vị trí sử dụng asset được xác minh | **${assets.measuredAssetSlots}/${assets.designAssetSlots}**, không thiếu |
| SVG gốc bị sửa | ${assets.modifiedSvgs.length} |
| Asset trùng hệt dùng chung bộ nhớ đệm | ${cache.exactAliases}; ${cache.uniqueRuntimeAssets} nguồn duy nhất |
${memory?`| Chuyển màn hình liên tục trong đợt kiểm tra cuối | **${memory.transitions}**, cùng tiến trình, ${memory.runtimeExceptions.length} lỗi JS |\n`:''}

**Chưa thể kết luận tất cả giao diện đạt 98%.** Còn **${failed.length} frame** dưới ngưỡng SSIM 0,98; không dùng số trung bình để thay cho điều kiện đạt trên từng frame.

## Các sửa đổi chính

- Thay điều hướng đoán theo chữ bằng reaction gốc, ID layer và màn hình đích của Figma.
- Giữ màn hình nền, vị trí, nền tối và hành vi đóng của từng overlay.
- Gắn vùng bấm vào nội dung cuộn; kiểm tra cả nút ngoài viewport ban đầu trên bản đồ.
- Menu đặt thủ công bám theo vị trí nút thực tế sau khi cuộn; đã kiểm tra hai menu ở cả vị trí đầu và vị trí cuộn.
- Bỏ qua reaction rỗng ở lớp chữ để action của nút cha vẫn nhận được chạm.
- Sửa hệ tọa độ nhóm, viền trong và chữ bị cắt; dùng Inter 3.19 sau khi đối chiếu trực tiếp.
- Giữ nguyên nguồn SVG và kích thước nội tại; dựng cache 3× cho 22 SVG có filter. Các tệp trùng nhau chỉ dùng chung khi SHA-256 giống hệt.

## Phạm vi và giới hạn

423 vùng bấm được kiểm tra bằng ADB, đối chiếu cả ID nhận chạm, màn hình đích và stack overlay. Các ca không đổi được giữ lại khi chỉ thay artwork hoặc cách giải mã; các frame có thay đổi vùng bấm được kiểm tra lại. Báo cáo chi tiết: [navigation-audit.json](${root}/verification/navigation-audit.json).

Ảnh tham chiếu được xuất scale 1 trực tiếp từ Figma. Ảnh Android 3× được chuẩn hóa về 1× bằng Lanczos; frame dài được ghép từ ảnh cuộn có chồng lấp. Crop xét cả render bounds, bóng đổ và cách làm tròn tọa độ của Android. Chỉ loại vùng nút Tools/tooltip 64 × 92 dp của Expo Go. Báo cáo chi tiết: [visual-audit.json](${root}/verification/visual-audit.json).

Prototype nguồn có ${nav.unwired.length} reaction rỗng hoặc không có destination, gồm cả các reaction trùng và lớp con có nút phủ lên. Không tự gán đích mới. Từ Flow 1 có thể tới **${reach.reachable}/142** frame; ${reach.unreachableFromFlowStart.map(f=>f.id+' ('+f.name+')').join(', ')} chưa có đường vào trong nguồn.

Transition/easing được lưu trong dữ liệu nguồn. Hiệu ứng chuyển cảnh chi tiết và Smart Animate theo từng layer chưa được tái tạo. Đây là kiểm tra giao diện và prototype; không có backend/OTP/giao dịch thực.

${memory?`Đợt stress cuối giữ cùng tiến trình qua ${memory.transitions} lần chuyển màn hình, nhưng PSS tăng từ ${(memory.initial.pssKb/1024).toFixed(0)} MB lên ${(memory.final.pssKb/1024).toFixed(0)} MB. Chưa coi đây là chứng nhận vấn đề bộ nhớ đã được xử lý triệt để. Xem [memory-stress.json](${root}/verification/memory-stress.json).`:''}

## Các frame còn dưới 98%

| Frame | Tên trong Figma | SSIM | Minh chứng |
|---|---|---:|---|
${rows}
`;
fs.writeFileSync('verification/AUDIT.md',markdown);
console.log('Wrote verification/AUDIT.md:',nav.passed,'hotspots passed;',failed.length,'frames below 98%.');
