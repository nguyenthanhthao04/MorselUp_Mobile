const imgFluentPin24Regular = "https://www.figma.com/api/mcp/asset/7b325822-fc90-4c96-9c8d-2d0816f406b7.svg";
const imgHugeiconsPen01 = "https://www.figma.com/api/mcp/asset/05622f89-94cc-4841-8888-8f013b7392f4.svg";
const imgTrash2 = "https://www.figma.com/api/mcp/asset/649cdebd-096e-40ae-83e4-84c95c8fc4ac.svg";

export default function QuanFrame267() {
  return (
    <div className="bg-[var(--background,#faf9f3)] content-stretch flex flex-col items-center overflow-clip relative rounded-[15px] size-full" data-node-id="16:19528" data-name="Quân. Frame 267">
      <div className="border-[var(--underline,#dce3d8)] border-b border-solid content-stretch flex gap-[5px] h-[65px] items-center justify-center overflow-clip px-[166px] py-[16px] relative shrink-0 w-[428px]" data-node-id="16:19529">
        <div className="relative shrink-0 size-[24px]" data-node-id="16:19530" data-name="fluent:pin-24-regular">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFluentPin24Regular} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-[color:var(--tiltle,#203c30)] whitespace-nowrap" data-node-id="16:19532">
          Ghim bài viết
        </p>
      </div>
      <a className="border-[var(--underline,#dce3d8)] border-b border-solid content-stretch cursor-pointer flex gap-[5px] h-[65px] items-center justify-center overflow-clip px-[166px] py-[16px] relative shrink-0 w-[428px]" data-node-id="16:19533">
        <div className="relative shrink-0 size-[24px]" data-node-id="16:19534" data-name="hugeicons:pen-01">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgHugeiconsPen01} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-[color:var(--tiltle,#203c30)] text-left whitespace-nowrap" data-node-id="16:19536">
          Chỉnh sửa bài viết
        </p>
      </a>
      <button className="content-stretch cursor-pointer flex gap-[5px] h-[65px] items-center justify-center overflow-clip px-[166px] py-[16px] relative shrink-0 w-[428px]" data-node-id="16:19537">
        <div className="relative shrink-0 size-[24px]" data-node-id="16:19538" data-name="trash-2">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrash2} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-[color:var(--tiltle,#203c30)] text-left whitespace-nowrap" data-node-id="16:19543">
          Xoá bài viết
        </p>
      </button>
    </div>
  );
}
