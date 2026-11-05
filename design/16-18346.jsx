const imgCamera = "https://www.figma.com/api/mcp/asset/68c359b2-087d-4295-94bb-c8ab1a48134b.svg";
const imgImages = "https://www.figma.com/api/mcp/asset/2682f4f6-130e-4f76-90b4-f8fdde12c08e.svg";
const imgX = "https://www.figma.com/api/mcp/asset/4217be31-5a2f-4d76-9644-d7caebb3764a.svg";

export default function Quan6() {
  return (
    <div className="bg-[var(--background,#faf9f3)] overflow-clip relative rounded-bl-[53px] rounded-br-[53px] rounded-tl-[20px] rounded-tr-[20px] size-full" data-node-id="16:18346" data-name="Quân 6.">
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col h-[210px] items-center justify-center left-1/2 top-0 w-[428px]" data-node-id="16:18347">
        <a className="border-[#dce3d8] border-b border-solid content-stretch cursor-pointer flex gap-[10px] items-center justify-center px-[147px] py-[22px] relative shrink-0 w-full" data-node-id="16:18348">
          <div className="relative shrink-0 size-[22px]" data-node-id="16:18349" data-name="camera">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamera} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[16px] text-left whitespace-nowrap" data-node-id="16:18351">
            Máy ảnh
          </p>
        </a>
        <div className="border-[#dce3d8] border-b border-solid content-stretch flex gap-[10px] items-center justify-center px-[28px] py-[24px] relative shrink-0 w-full" data-node-id="16:18352">
          <div className="relative shrink-0 size-[22px]" data-node-id="16:18353" data-name="images">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgImages} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[16px] whitespace-nowrap" data-node-id="16:18355">
            Chọn ảnh từ thư viện
          </p>
        </div>
        <button className="content-stretch cursor-pointer flex gap-[10px] items-center justify-center px-[149px] py-[23px] relative shrink-0 w-full" data-node-id="16:18356">
          <div className="relative shrink-0 size-[22px]" data-node-id="16:18357" data-name="x">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[16px] text-left whitespace-nowrap" data-node-id="16:18359">
            Huỷ bỏ
          </p>
        </button>
      </div>
    </div>
  );
}
