const imgBasilUserBlockOutline = "https://www.figma.com/api/mcp/asset/22b74382-aa94-4d17-b4fe-eb1aed6f32f2.svg";

export default function Tho5() {
  return (
    <div className="bg-[var(--background,#faf9f3)] content-stretch flex flex-col gap-[18px] items-start overflow-clip p-[24px] relative rounded-[24px] size-full" data-node-id="16:15918" data-name="Thảo 5.">
      <div className="bg-[var(--btnn,#f3e4cb)] content-stretch flex items-center justify-center overflow-clip relative rounded-[26px] shrink-0 size-[52px]" data-node-id="16:15919" data-name="Cảnh báo">
        <div className="relative shrink-0 size-[30px]" data-node-id="16:15920" data-name="basil:user-block-outline">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBasilUserBlockOutline} />
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.45] min-w-full not-italic relative shrink-0 text-[22px] text-[color:var(--tiltle,#203c30)] w-[min-content]" data-node-id="16:15924">
        Chặn User 2?
      </p>
      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.45] min-w-full not-italic relative shrink-0 text-[14px] text-[color:var(--tiltle,#203c30)] w-[min-content]" data-node-id="16:15925">
        Bạn sẽ không còn thấy bài đăng của User 2 trong bảng tin và kết quả tìm kiếm.
      </p>
      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.45] min-w-full not-italic relative shrink-0 text-[13px] text-[color:var(--text,#717c73)] w-[min-content]" data-node-id="16:15926">
        Hai bạn không thể nhắn tin hoặc gửi yêu cầu nhận thực phẩm cho nhau. Bạn có thể bỏ chặn bất kỳ lúc nào.
      </p>
      <a className="bg-[var(--bt,#a33f3f)] content-stretch cursor-pointer flex h-[52px] items-center justify-center px-[16px] py-[8px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:15927" data-name="Chặn người dùng">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-left text-white whitespace-nowrap" data-node-id="I16:15927;136:714">
          Chặn người dùng
        </p>
      </a>
      <button className="bg-[var(--btn-select\,-icon,#245e45)] content-stretch cursor-pointer flex h-[52px] items-center justify-center px-[16px] py-[8px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:15928" data-name="Hủy">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-[color:var(--card,white)] text-left whitespace-nowrap" data-node-id="I16:15928;136:714">
          Hủy
        </p>
      </button>
    </div>
  );
}
