const imgCamera = "https://www.figma.com/api/mcp/asset/4231893e-9ec5-4564-9910-969aa55f0d26.svg";
const imgImages = "https://www.figma.com/api/mcp/asset/dd5903ee-ae1e-48c3-a98a-3b8e59b3032a.svg";
const imgX = "https://www.figma.com/api/mcp/asset/b9ac7dac-7b8e-4097-913f-b2f079154655.svg";

export default function Quan6A() {
  return (
    <div className="bg-[var(--background,#faf9f3)] overflow-clip relative rounded-bl-[53px] rounded-br-[53px] rounded-tl-[20px] rounded-tr-[20px] size-full" data-node-id="16:18332" data-name="Quân 6.A">
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col h-[210px] items-center justify-center left-1/2 top-0 w-[428px]" data-node-id="16:18333">
        <a className="border-[#dce3d8] border-b border-solid content-stretch cursor-pointer flex gap-[10px] items-center justify-center px-[147px] py-[22px] relative shrink-0 w-full" data-node-id="16:18334">
          <div className="relative shrink-0 size-[22px]" data-node-id="16:18335" data-name="camera">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamera} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[16px] text-left whitespace-nowrap" data-node-id="16:18337">
            Máy ảnh
          </p>
        </a>
        <div className="border-[#dce3d8] border-b border-solid content-stretch flex gap-[10px] items-center justify-center px-[28px] py-[24px] relative shrink-0 w-full" data-node-id="16:18338">
          <div className="relative shrink-0 size-[22px]" data-node-id="16:18339" data-name="images">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgImages} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[16px] whitespace-nowrap" data-node-id="16:18341">
            Chọn ảnh từ thư viện
          </p>
        </div>
        <button className="content-stretch cursor-pointer flex gap-[10px] items-center justify-center px-[149px] py-[23px] relative shrink-0 w-full" data-node-id="16:18342">
          <div className="relative shrink-0 size-[22px]" data-node-id="16:18343" data-name="x">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[16px] text-left whitespace-nowrap" data-node-id="16:18345">
            Huỷ bỏ
          </p>
        </button>
      </div>
    </div>
  );
}
