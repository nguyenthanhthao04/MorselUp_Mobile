const imgX = "https://www.figma.com/api/mcp/asset/01e3d5a4-6d08-4016-bd7d-48232892da7b.svg";
const imgLink = "https://www.figma.com/api/mcp/asset/523b6e95-9aa1-4c2a-af2d-02ac53e79ca8.svg";

export default function Tho8() {
  return (
    <div className="bg-[var(--background,#faf9f3)] content-stretch flex flex-col gap-[18px] items-start overflow-clip pb-[36px] pt-[12px] px-[24px] relative rounded-tl-[28px] rounded-tr-[28px] size-full" data-node-id="16:15586" data-name="Thảo 8.">
      <div className="content-stretch flex items-start justify-center overflow-clip relative shrink-0 w-full" data-node-id="16:15587" data-name="Vùng tay nắm">
        <div className="bg-[var(--underline,#dce3d8)] h-[5px] relative rounded-[5px] shrink-0 w-[44px]" data-node-id="16:15588" data-name="Tay nắm" />
      </div>
      <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="16:15589" data-name="Tiêu đề bảng">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold'] font-semibold leading-[1.45] min-w-px not-italic relative text-[22px] text-[color:var(--tiltle,#203c30)]" data-node-id="16:15590">
          Chia sẻ bài đăng
        </p>
        <button className="block cursor-pointer relative shrink-0 size-[22px]" data-node-id="16:15591" data-name="x">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
        </button>
      </div>
      <div className="bg-white border border-[var(--underline,#dce3d8)] border-solid content-stretch flex flex-col items-start overflow-clip p-[16px] relative rounded-[20px] shrink-0 w-full" data-node-id="16:15593" data-name="Thông tin">
        <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="16:15594" data-name="Liên kết">
          <div className="relative shrink-0 size-[20px]" data-node-id="16:15595" data-name="link">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLink} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.45] min-w-px not-italic relative text-[12px] text-[color:var(--tiltle,#203c30)]" data-node-id="16:15597">
            morselup.vn/bai-dang/user2/bunrieumienphi
          </p>
        </div>
      </div>
      <div className="bg-[var(--btn-select\,-icon,#245e45)] content-stretch flex h-[52px] items-center justify-center px-[16px] py-[8px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:15598" data-name="Sao chép liên kết">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="I16:15598;136:714">
          Sao chép liên kết
        </p>
      </div>
      <button className="bg-white border-2 border-[var(--underline,#dce3d8)] border-solid content-stretch cursor-pointer flex h-[52px] items-center justify-center px-[16px] py-[8px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:15599" data-name="Hủy">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-[color:var(--btn-select\,-icon,#245e45)] text-left whitespace-nowrap" data-node-id="I16:15599;136:714">
          Hủy
        </p>
      </button>
    </div>
  );
}
