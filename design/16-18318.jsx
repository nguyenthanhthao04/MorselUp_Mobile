const imgCamera = "https://www.figma.com/api/mcp/asset/ebff65a5-de3a-4f95-9dc8-28433d84578e.svg";
const imgImages = "https://www.figma.com/api/mcp/asset/bf71bc9a-04f8-4f2b-89c8-921cecb56b01.svg";
const imgX = "https://www.figma.com/api/mcp/asset/064f3593-fd6e-4d46-934a-72558467476b.svg";

export default function Quan6() {
  return (
    <div className="bg-[var(--background,#faf9f3)] overflow-clip relative rounded-bl-[53px] rounded-br-[53px] rounded-tl-[20px] rounded-tr-[20px] size-full" data-node-id="16:18318" data-name="Quân 6.">
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col h-[210px] items-center justify-center left-1/2 top-0 w-[428px]" data-node-id="16:18319">
        <a className="border-[#dce3d8] border-b border-solid content-stretch cursor-pointer flex gap-[10px] items-center justify-center px-[147px] py-[22px] relative shrink-0 w-full" data-node-id="16:18320">
          <div className="relative shrink-0 size-[22px]" data-node-id="16:18321" data-name="camera">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamera} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[16px] text-left whitespace-nowrap" data-node-id="16:18323">
            Máy ảnh
          </p>
        </a>
        <div className="border-[#dce3d8] border-b border-solid content-stretch flex gap-[10px] items-center justify-center px-[28px] py-[24px] relative shrink-0 w-full" data-node-id="16:18324">
          <div className="relative shrink-0 size-[22px]" data-node-id="16:18325" data-name="images">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgImages} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[16px] whitespace-nowrap" data-node-id="16:18327">
            Chọn ảnh từ thư viện
          </p>
        </div>
        <button className="content-stretch cursor-pointer flex gap-[10px] items-center justify-center px-[149px] py-[23px] relative shrink-0 w-full" data-node-id="16:18328">
          <div className="relative shrink-0 size-[22px]" data-node-id="16:18329" data-name="x">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[16px] text-left whitespace-nowrap" data-node-id="16:18331">
            Huỷ bỏ
          </p>
        </button>
      </div>
    </div>
  );
}
