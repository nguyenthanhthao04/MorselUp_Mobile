const imgPolygon1 = "https://www.figma.com/api/mcp/asset/6a299f31-5c3b-40d7-aaff-71700c2dcaef.svg";
const imgArrowLeft2 = "https://www.figma.com/api/mcp/asset/0d9dd4af-efdd-4f6a-b9b2-bd57a1d3112e.svg";

export default function Hiu4() {
  return (
    <div className="bg-[var(--background,#faf9f3)] relative size-full" data-node-id="16:13981" data-name="Hiếu 4">
      <p className="[word-break:break-word] absolute font-['Inter:Extra_Bold'] font-extrabold leading-[normal] left-[39px] not-italic text-[24px] text-[color:var(--tiltle,#203c30)] top-[135px] whitespace-nowrap" data-node-id="16:13982">
        Nhập số điện thoại
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Extra_Bold'] font-extrabold leading-[normal] left-[21px] not-italic text-[30px] text-black top-[264px] whitespace-nowrap" data-node-id="16:13983">{` `}</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[normal] left-[39px] not-italic text-[14px] text-[color:var(--text,#717c73)] top-[175px] w-[350px]" data-node-id="16:13984">
        Chúng tôi sẽ gửi mã OTP gồm 6 số để xác thực số điện thoại của bạn.
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[normal] left-[40px] not-italic text-[14px] text-[color:var(--text,#717c73)] top-[233px] w-[92px]" data-node-id="16:13985">
        Số điện thoại
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[0] left-[17px] not-italic text-[12px] text-[color:var(--text,#717c73)] top-[877px] w-[428px]" data-node-id="16:13986">
        <span className="leading-[normal] text-[#717c73]">Bằng việc tiếp tục, bạn đồng ý với</span>
        <span className="[text-underline-position:from-font] decoration-from-font decoration-solid font-['Inter:Bold'] font-bold leading-[normal] text-[#717c73] underline">{` Điều khoản`}</span>
        <span className="leading-[normal] text-[#717c73]">{` và `}</span>
        <span className="[text-underline-position:from-font] decoration-from-font decoration-solid font-['Inter:Bold'] font-bold leading-[normal] text-[#717c73] underline">Chính sách</span>
        <span className="leading-[normal] text-[#717c73]">{` bảo mật`}</span>
      </p>
      <div className="absolute contents left-[39px] top-[275px]" data-node-id="16:13987">
        <div className="absolute bg-white border border-[#245e45] border-solid h-[45px] left-[39px] rounded-[8px] top-[275px] w-[81px]" data-node-id="16:13988" />
        <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[normal] left-[57px] not-italic text-[14px] text-[color:var(--text,#717c73)] top-[calc(50%-174px)] whitespace-nowrap" data-node-id="16:13989">
          +84
        </p>
        <div className="-translate-y-1/2 absolute flex h-[8.25px] items-center justify-center left-[103px] top-[calc(50%-163.87px)] w-[10.392px]" data-node-id="16:13990">
          <div className="flex-none rotate-180">
            <div className="h-[8.25px] relative w-[10.392px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPolygon1} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[128px] top-[275px]" data-node-id="16:13991">
        <div className="absolute bg-white border border-[#245e45] border-solid h-[45px] left-[128px] rounded-[8px] top-[275px] w-[261px]" data-node-id="16:13992" />
        <p className="[word-break:break-word] absolute font-['Inter:Extra_Light'] font-extralight leading-[normal] left-[144px] not-italic text-[14px] text-black top-[calc(50%-174px)] w-[235px]" data-node-id="16:13993">
          123 456 789
        </p>
      </div>
      <a className="absolute bg-[#245e45] content-stretch cursor-pointer flex h-[47px] items-center justify-center left-[39px] px-[16px] py-[8px] rounded-[8px] top-[380px] w-[350px]" data-node-id="16:13994" data-name="Button">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-left text-white whitespace-nowrap" data-node-id="I16:13994;136:714">
          Gửi mã OTP
        </p>
      </a>
      <button className="absolute block cursor-pointer left-[39px] overflow-clip size-[30px] top-[51px]" data-node-id="16:13995" data-name="Arrow - Left 2 - Iconly Pro">
        <div className="absolute contents inset-[20.83%_35.42%]" data-node-id="16:13996" data-name="Iconly/Two-tone/Arrow---Left-2">
          <div className="absolute flex inset-[20.83%_35.42%] items-center justify-center" data-node-id="16:13997" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
              <div className="relative size-full" data-name="Arrow---Left-2">
                <div className="absolute inset-[-17.14%_-8.57%]">
                  <img alt="" className="block max-w-none size-full" src={imgArrowLeft2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
