const imgRectangle27 = "https://www.figma.com/api/mcp/asset/8e509ef0-739a-4bc4-89c0-bb280bc6d217.png";
const imgQuayLi = "https://www.figma.com/api/mcp/asset/470df82d-0521-4b01-b1d4-fe584a2107b4.svg";
const imgShieldCheck = "https://www.figma.com/api/mcp/asset/e61417dc-d050-45bc-9bd0-b82deccdfe37.svg";
const imgInfo = "https://www.figma.com/api/mcp/asset/90d20a2e-81a2-463a-a9e6-06e4bcb9e22b.svg";

export default function Tho6() {
  return (
    <div className="bg-[var(--background,#faf9f3)] relative size-full" data-node-id="16:21916" data-name="Thảo 6.">
      <div className="absolute bg-[var(--btn,#eaf1e6)] content-stretch flex h-[61px] items-center left-0 overflow-clip px-[24px] right-0 top-[54px]" data-node-id="16:21917" data-name="Điều hướng">
        <a className="bg-white border border-[#dce3d8] border-solid content-stretch cursor-pointer flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[40px]" data-node-id="16:21918" data-name="Quay lại">
          <div className="relative shrink-0 size-[21px]" data-node-id="16:21919" data-name="Quay lại">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgQuayLi} />
          </div>
        </a>
      </div>
      <div className="absolute content-stretch flex flex-col h-[716px] items-start left-0 overflow-clip top-[115px] w-[428px]" data-node-id="16:21920" data-name="Vùng nội dung cuộn">
        <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip pb-[24px] pt-[8px] px-[24px] relative shrink-0 w-full" data-node-id="16:21921" data-name="Nội dung cuộn">
          <div className="content-stretch flex flex-col gap-[20px] items-center overflow-clip pb-[24px] pt-[46px] relative shrink-0 w-full" data-node-id="16:21922" data-name="Người dùng đã chặn">
            <div className="relative rounded-[100px] shrink-0 size-[88px]" data-node-id="16:21923">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgRectangle27} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.45] min-w-full not-italic relative shrink-0 text-[25px] text-[color:var(--tiltle,#203c30)] text-center w-[min-content]" data-node-id="16:21924">
              User 2
            </p>
            <div className="bg-[var(--btnn,#f3e4cb)] content-stretch flex items-start overflow-clip px-[10px] py-[5px] relative rounded-[8px] shrink-0" data-node-id="16:21925" data-name="Trạng thái">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[11px] text-[color:var(--btn-select\,-icon,#245e45)] whitespace-nowrap" data-node-id="16:21926">
                Đã chặn
              </p>
            </div>
            <div className="bg-[var(--btn,#eaf1e6)] content-stretch flex items-center justify-center overflow-clip relative rounded-[44px] shrink-0 size-[88px]" data-node-id="16:21927" data-name="Bảo vệ riêng tư">
              <div className="relative shrink-0 size-[40px]" data-node-id="16:21928" data-name="shield-check">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShieldCheck} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.45] min-w-full not-italic relative shrink-0 text-[20px] text-[color:var(--tiltle,#203c30)] text-center w-[min-content]" data-node-id="16:21930">
              Bạn đã chặn người dùng này
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.45] min-w-full not-italic relative shrink-0 text-[14px] text-[color:var(--tiltle,#203c30)] text-center w-[min-content]" data-node-id="16:21931">
              Bài đăng của User 2 đã được ẩn. Hai bạn không thể liên hệ hoặc gửi yêu cầu cho nhau.
            </p>
          </div>
          <div className="bg-[var(--btn-select\,-icon,#245e45)] content-stretch flex h-[52px] items-center justify-center px-[16px] py-[8px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:21932" data-name="Bỏ chặn User 2">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-[color:var(--card,white)] whitespace-nowrap" data-node-id="I16:21932;136:714">
              Bỏ chặn User 2
            </p>
          </div>
          <div className="bg-[var(--btnn,#f3e4cb)] content-stretch flex gap-[10px] items-start overflow-clip p-[14px] relative rounded-[14px] shrink-0 w-full" data-node-id="16:21933" data-name="Lưu ý">
            <div className="relative shrink-0 size-[19px]" data-node-id="16:21934" data-name="info">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgInfo} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.45] min-w-px not-italic relative text-[12px] text-[color:var(--tiltle,#203c30)]" data-node-id="16:21936">
              Sau khi bỏ chặn, bạn có thể xem lại bài đăng và liên hệ với người dùng này.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
