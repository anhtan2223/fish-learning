import { Divider, Collapse } from "antd";
import type { CollapseProps } from 'antd';
import Link from "next/link";


export default function Page() {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: "Giới thiệu về KNN",
      children: <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus magni praesentium voluptatum eius corrupti consequuntur aliquam dicta pariatur animi culpa!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque nesciunt pariatur repudiandae perferendis! Incidunt qui ut eaque quo? Quo quibusdam enim maxime, beatae similique facere architecto eius aspernatur rem distinctio nostrum. Doloremque quaerat voluptates, quod autem inventore architecto at eveniet reprehenderit quae adipisci et corporis itaque a est tempora tempore, dignissimos, explicabo vitae. Praesentium in tenetur numquam eius, minus nihil.
      </p>,
    },
    {
      key: '2',
      label: "Cách thức hoạt động của KNN",
      children: <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae dolorum voluptates eum, dolores amet cupiditate blanditiis pariatur ea porro error facere a repellat, beatae modi illo praesentium dolor! Itaque, asperiores dicta veniam porro quas et ea quos iusto reiciendis totam cumque dolor accusamus tempora temporibus. Unde voluptas cupiditate distinctio ab at incidunt veniam rem hic harum placeat dicta nemo quia tempore possimus cum porro, sint voluptatum quibusdam veritatis modi. Illo consequatur dignissimos quibusdam aut nobis, laudantium facilis doloremque unde nulla architecto vitae distinctio ut reiciendis praesentium earum corporis iure quas enim, fugiat delectus modi alias voluptate. Voluptas pariatur, quisquam corporis magnam accusantium eius autem quidem veniam corrupti perspiciatis? Saepe, possimus. Asperiores, iste labore odio molestiae ullam amet quos ipsa. Accusamus commodi enim tenetur sint, adipisci voluptas pariatur? Facere impedit, quas sed praesentium aspernatur asperiores reiciendis similique consequuntur, placeat voluptates expedita autem obcaecati nulla iste fuga sunt repellat at modi. Fugiat architecto voluptate sint totam debitis ut at qui. Pariatur alias a provident eos, quas velit et? Recusandae quasi a quo, veritatis deserunt ea assumenda ullam quas vel sit reiciendis ipsam aperiam dolores, dolore voluptas corrupti rerum alias necessitatibus porro beatae commodi odit? Obcaecati inventore accusantium a quas exercitationem? Ipsum, ad.
      </p>,
    },
    {
      key: '3',
      label: "Khoảng cách",
      children: <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus magni praesentium voluptatum eius corrupti consequuntur aliquam dicta pariatur animi culpa!
      </p>,
    },
    {
      key: '4',
      label: "Lựa chọn số K",
      children: <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus magni praesentium voluptatum eius corrupti consequuntur aliquam dicta pariatur animi culpa!
      </p>,
    },
    {
      key: '5',
      label: "Ưu điểm và nhược điểm của KNN",
      children: <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus magni praesentium voluptatum eius corrupti consequuntur aliquam dicta pariatur animi culpa!
      </p>,
    },
    {
      key: '6',
      label: "Ví dụ ứng dụng",
      children: <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus magni praesentium voluptatum eius corrupti consequuntur aliquam dicta pariatur animi culpa!
      </p>,
    }
  ]
  return <>
    <div className="font-semibold text-lg w-full flex justify-center">
      <p>Phương Pháp K Láng Giềng</p>
    </div>
    <Divider orientation="left">Lý Thuyết</Divider>
    <Collapse defaultActiveKey={['1']} ghost items={items} />
    <Divider orientation="left">Thực Hành</Divider>
    <div >
      <Link href="/assignment">
        <p>
          1. Đọc file dữ liệu” “baitap1.csv”
        </p>
      </Link>
      <p>
        2. Hiển thị dữ liệu vừa đọc
      </p>
      <p>
        3. Hiển thị tất cả dữ liệu cột số 3
      </p>
      <p>
        4. Hiển thị dữ liệu từ dòng 5 đến dòng 10
      </p>
      <p>
        5. Hiển thị dữ liệu cột 1,2 của dòng 5
      </p>
      <p>
        6. Tạo biến “x” là dữ liệu của cột 2, biến “y” là dữ liệu của cột 3, biễu diễn dữ liệu
        này lên mặt phẳng toạ độ với biến x = trục hoành, biến y = trục tung
      </p>
      <p>
        7. Sử dụng vòng lăp for để in ra các số lẻ từ 1 đến 50
      </p>
      <p>
        8. Cài đặt và import thành công thư viện sklearn
      </p>
    </div>
    <Divider orientation="left">Tài Liệu</Divider>

  </>
}