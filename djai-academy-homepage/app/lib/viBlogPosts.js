export const viBlogPosts = [
  {
    slug: "vibe-coding-cho-nguoi-moi",
    alternateEn: null,
    title: "Vibe coding cho người mới: bắt đầu từ bài toán, không phải từ câu lệnh",
    seoTitle: "Vibe coding cho người mới: quy trình làm sản phẩm bằng AI",
    seoDescription: "Quy trình vibe coding thực tế cho người mới: thu gọn ý tưởng, viết yêu cầu, chia vòng kiểm tra và đưa phiên bản đầu tiên lên chạy.",
    excerpt: "Một quy trình thực tế để dùng AI xây website hoặc ứng dụng đầu tiên mà không giao toàn bộ quyết định cho AI.",
    category: "Hướng dẫn", readingTime: "Đọc 8 phút", author: "DJAI Academy", publishedAt: "2026-08-12T02:00:00.000Z", updatedAt: "2026-08-12T02:00:00.000Z",
    keywords: ["vibe coding", "học vibe coding", "lập trình với AI", "xây ứng dụng bằng AI"],
    content: `## Vibe coding không có nghĩa là để AI tự quyết định mọi thứ

Bạn mô tả điều mình muốn, AI viết ra một phần giao diện, rồi vài phút sau đã có thứ gì đó chạy trên màn hình. Cảm giác này rất cuốn. Vấn đề xuất hiện ở bước kế tiếp: nút bấm không lưu dữ liệu, đăng nhập chỉ đúng ở một luồng, hoặc mỗi lần sửa lại làm hỏng một phần khác.

Vibe coding hữu ích khi bạn giữ vai trò người chịu trách nhiệm cho sản phẩm. AI có thể đề xuất code và cách làm; bạn vẫn phải quyết định người dùng cần gì, kết quả nào được xem là đúng và bằng chứng nào đủ để chấp nhận một thay đổi.

## Bắt đầu bằng một câu mô tả có thể kiểm tra

Đừng bắt đầu với “hãy làm cho tôi một ứng dụng tuyệt vời”. Hãy viết một câu có người dùng, hành động và kết quả. Ví dụ: “Một chủ quán có thể nhập tên món, giá và ảnh, sau đó nhận được trang menu có đường dẫn để chia sẻ.”

Câu này chưa phải bản đặc tả hoàn chỉnh, nhưng nó cho bạn ba điểm để kiểm tra: ai dùng, họ làm gì và đầu ra là gì. Những ý như hệ thống điểm thưởng, chatbot hay dashboard phân tích có thể để sau.

## Chia phiên bản đầu thành bốn lớp

:::flow
- Luồng chính mà người dùng phải hoàn thành
- Dữ liệu tối thiểu cần lưu
- Trạng thái lỗi cần nhìn thấy
- Cách đưa bản demo lên một địa chỉ có thể mở
:::

Với ví dụ menu, luồng chính có thể chỉ gồm tạo món, sửa món và xem trang công khai. Dữ liệu gồm tên, giá, mô tả ngắn và ảnh. Trạng thái lỗi gồm thiếu tên, giá không hợp lệ và ảnh quá lớn. Khi bốn phần này rõ, AI nhận được ngữ cảnh tốt hơn và bạn cũng dễ nhận ra nó đang đi lệch.

## Làm từng lát nhỏ, kiểm tra ngay sau mỗi lát

Một yêu cầu kéo dài hàng trang thường tạo ra nhiều code nhưng ít chắc chắn. Hãy yêu cầu AI làm một lát có thể quan sát: dựng form, thêm kiểm tra dữ liệu, lưu một bản ghi, rồi hiển thị bản ghi đó. Sau mỗi bước, tự thao tác như người dùng thật.

- Thử dữ liệu đúng và dữ liệu thiếu
- Tải lại trang để xem dữ liệu còn hay mất
- Mở trên màn hình nhỏ
- Đọc thông báo lỗi thay vì chỉ xem console
- Ghi lại điều đã xác minh trước khi chuyển sang phần mới

Nếu bạn chưa biết cách kiểm tra, hãy yêu cầu AI liệt kê tình huống kiểm thử trước khi sửa code. Danh sách đó vẫn cần bạn xem lại, nhưng nó buộc cuộc trò chuyện chuyển từ “trông có vẻ ổn” sang kết quả quan sát được.

## Khi nào cần học phần kỹ thuật?

Bạn không cần học thuộc frontend, backend, database và deployment trước ngày đầu. Nhưng bạn cần hiểu mỗi phần khi nó trở thành điểm nghẽn.

Khi dữ liệu biến mất sau khi refresh, đó là lúc học sự khác nhau giữa state tạm thời và database. Khi người khác không mở được bản demo, đó là lúc học deployment và biến môi trường. Khi một tài khoản xem được dữ liệu của tài khoản khác, hãy dừng lại và học authorization trước khi thêm tính năng.

Kiến thức đi cùng vấn đề thật thường bám lâu hơn một danh sách thuật ngữ. Bạn cũng biết chính xác vì sao mình cần nó.

## Một nguyên tắc dừng đơn giản

Hãy dừng thêm tính năng khi luồng chính chưa chạy ổn từ đầu đến cuối. Sản phẩm có ba màn hình dùng được sẽ có giá trị hơn mười màn hình chỉ để trình diễn. Phiên bản đầu tiên nên trả lời một câu: người dùng mục tiêu có hoàn thành được việc quan trọng nhất không?

Bạn có thể xem [lộ trình AI Masterclass](/course/vi/) nếu muốn đi qua quy trình này trong một workshop có hướng dẫn. Nếu muốn tự bắt đầu, hãy chọn một trong các [công cụ miễn phí của DJAI](/tools/vi/), quan sát cách nó giới hạn một tác vụ, rồi viết lại cùng cấu trúc cho ý tưởng của bạn.`
  },
  {
    slug: "nen-chon-jpg-png-hay-webp",
    alternateEn: "how-to-convert-jpg-png-webp-free",
    title: "Nên chọn JPG, PNG hay WebP? Cách quyết định trước khi đổi định dạng ảnh",
    seoTitle: "JPG, PNG và WebP khác nhau thế nào? Cách chọn đúng",
    seoDescription: "So sánh JPG, PNG và WebP theo nhu cầu thực tế: ảnh chụp, nền trong suốt, hình giao diện và tốc độ website; kèm quy trình đổi ảnh trên trình duyệt.",
    excerpt: "Đừng đổi định dạng theo thói quen. Hãy chọn dựa trên loại hình, độ trong suốt, nơi sử dụng và giới hạn dung lượng.",
    category: "Hướng dẫn sử dụng", readingTime: "Đọc 6 phút", author: "DJAI Academy", publishedAt: "2026-08-12T02:10:00.000Z", updatedAt: "2026-08-12T02:10:00.000Z",
    keywords: ["JPG PNG WebP", "đổi định dạng ảnh", "WebP là gì", "nén ảnh website"],
    content: `## Câu hỏi đúng không phải “định dạng nào tốt nhất?”

Không có định dạng ảnh thắng trong mọi trường hợp. Một ảnh sản phẩm nhiều màu, một logo nền trong suốt và một ảnh chụp màn hình chứa chữ cần những cách lưu khác nhau. Chọn sai có thể làm tệp nặng, chữ bị nhòe hoặc mất hẳn nền trong suốt.

Trước khi đổi định dạng, hãy trả lời ba câu: đây là ảnh chụp hay đồ họa, có cần trong suốt không, và ảnh sẽ được dùng trên web hay trong một quy trình khác?

## So sánh nhanh

| Định dạng | Phù hợp nhất | Điểm cần lưu ý |
|---|---|---|
| JPG | Ảnh chụp, nhiều màu, cần tệp gọn | Không hỗ trợ nền trong suốt; nén nhiều làm xuất hiện nhiễu |
| PNG | Logo, icon, ảnh giao diện, cần trong suốt | Có thể rất nặng với ảnh chụp lớn |
| WebP | Ảnh cho website, cần cân bằng chất lượng và dung lượng | Cần kiểm tra quy trình cũ nếu hệ thống nhận tệp giới hạn |

### Chọn JPG khi đầu vào là ảnh chụp

JPG phù hợp với ảnh có nhiều chuyển sắc như món ăn, con người hoặc không gian. Nếu mục tiêu là gửi qua email hoặc tải lên biểu mẫu chỉ chấp nhận JPG, đây thường là lựa chọn đơn giản nhất. Đừng lưu đi lưu lại JPG nhiều lần ở chất lượng thấp vì mỗi lần nén có thể làm ảnh xuống thêm.

### Chọn PNG khi từng đường nét phải rõ

PNG giữ tốt chữ, icon, biểu đồ và ảnh chụp giao diện. Đây cũng là lựa chọn quen thuộc khi cần nền trong suốt. Đổi một ảnh chụp lớn sang PNG không tự làm ảnh đẹp hơn; nó thường chỉ tạo ra tệp lớn hơn.

### Chọn WebP cho trang web hiện đại

WebP thường cho tệp nhỏ hơn ở chất lượng thị giác tương đương và có thể hỗ trợ nền trong suốt. Điều đó giúp giảm dữ liệu tải trên landing page, bài viết và danh mục sản phẩm. Tuy vậy, hãy kiểm tra hệ thống quản trị hoặc đối tác nhận tệp nếu họ quy định chỉ dùng JPG/PNG.

## Quy trình đổi ảnh mà không làm mất bản gốc

:::flow
- Giữ nguyên tệp gốc ở một thư mục riêng
- Chọn định dạng theo nơi ảnh sẽ được sử dụng
- Giảm kích thước pixel nếu ảnh lớn hơn nhu cầu hiển thị
- Xuất một bản mới và so sánh ở kích thước xem thực tế
:::

Bạn có thể mở [DJAI Image Tools](/tools/resizeimg/en/) để đổi JPG, PNG và WebP ngay trong trình duyệt. Giao diện công cụ hiện dùng tiếng Anh; tệp được xử lý trên thiết bị theo thông báo của trang công cụ.

## Đừng chỉ nhìn con số KB

Một ảnh nhỏ hơn chưa chắc tốt hơn nếu chữ khó đọc hoặc chi tiết sản phẩm bị bệt. Hãy so sánh ở kích thước ảnh thật sự xuất hiện trên website. Với ảnh hero rộng, hãy kiểm tra cả desktop lẫn điện thoại; với thumbnail, đừng đánh giá bằng cách phóng lên 400%.

Nếu mục tiêu là tốc độ web, định dạng chỉ là một phần. Kích thước pixel, số lượng ảnh tải ngay, thuộc tính width/height và cách trì hoãn ảnh ngoài màn hình cũng ảnh hưởng đến trải nghiệm.

## Kết luận thực dụng

Dùng JPG cho ảnh chụp và khả năng tương thích rộng, PNG cho nền trong suốt hoặc đồ họa sắc nét, WebP cho phần lớn hình ảnh trên website hiện đại. Luôn giữ bản gốc và xuất bản mới theo từng mục đích; đừng dùng một tệp duy nhất cho mọi nơi.`
  },
  {
    slug: "tao-ma-qr-cho-menu-su-kien-website",
    alternateEn: "how-to-create-free-qr-code",
    title: "Tạo mã QR cho menu, sự kiện hoặc website: làm sao để quét được ngoài đời thật",
    seoTitle: "Cách tạo mã QR miễn phí cho menu, sự kiện và website",
    seoDescription: "Hướng dẫn tạo mã QR miễn phí, chọn đúng đường dẫn, kích thước và định dạng tệp; kèm checklist kiểm tra trước khi in.",
    excerpt: "Tạo QR chỉ mất một phút; kiểm tra đường dẫn, độ tương phản và bản in mới là phần quyết định nó có dùng được hay không.",
    category: "Hướng dẫn sử dụng", readingTime: "Đọc 6 phút", author: "DJAI Academy", publishedAt: "2026-08-12T02:20:00.000Z", updatedAt: "2026-08-12T02:20:00.000Z",
    keywords: ["tạo mã QR miễn phí", "mã QR cho menu", "QR sự kiện", "QR website"],
    content: `## Một mã QR tốt chỉ dẫn đến một hành động rõ

Người dùng nhìn thấy mã QR trong vài giây. Họ cần biết quét để làm gì: xem menu, đăng ký sự kiện, mở bản đồ hay đọc hướng dẫn. Nếu một mã dẫn đến trang chủ rồi bắt người dùng tự tìm tiếp, bạn đã chuyển sự tiện lợi thành thêm một bước khó chịu.

Hãy tạo một trang đích ổn định trước. Với menu, đó nên là trang menu đang mở; với sự kiện, đó là trang có thời gian, địa điểm và nút đăng ký; với thanh toán, hãy dùng đúng đường dẫn do nhà cung cấp tạo và kiểm tra quy trình bảo mật của họ.

## Bước 1: chuẩn bị đường dẫn

Mở đường dẫn trên điện thoại khi chưa đăng nhập. Kiểm tra xem nó có yêu cầu quyền truy cập, chuyển hướng vòng lặp hoặc hiển thị thông tin cũ không. Xóa các tham số theo dõi không cần thiết nếu chúng làm URL dài và dễ thay đổi.

Nếu bạn muốn đo hiệu quả chiến dịch, có thể dùng URL gắn UTM, nhưng hãy giữ một bản ghi cho biết mã nào đang dùng ở vật liệu nào. Khi đổi trang đích sau này, bạn sẽ biết những bản in nào bị ảnh hưởng.

## Bước 2: tạo mã và giữ độ tương phản

Mở [công cụ tạo QR miễn phí của DJAI](/tools/qrgen/en/), nhập đường dẫn và xem bản xem trước. Giao diện công cụ hiện dùng tiếng Anh và không yêu cầu tài khoản.

Nền sáng và mã tối là lựa chọn an toàn. Màu thương hiệu có thể dùng nếu độ tương phản vẫn đủ mạnh. Tránh đặt họa tiết phức tạp hoặc ảnh ngay phía sau mã. Khoảng trắng quanh mã không phải phần trang trí; thiết bị cần vùng này để nhận diện biên.

## Bước 3: chọn PNG hay SVG

- PNG phù hợp với tài liệu online, bài đăng và bản in nhỏ khi kích thước đã được chốt.
- SVG phù hợp với poster, bảng hiệu hoặc file đưa cho designer vì có thể phóng lớn mà không vỡ nét.

Nếu dùng SVG trong phần mềm thiết kế, đừng bóp méo tỷ lệ. Với PNG, tránh kéo ảnh nhỏ lên quá lớn. Một mã nhòe ở màn hình thiết kế có thể thất bại sau khi in.

## Bước 4: kiểm tra trong điều kiện thật

Đừng chỉ quét mã trên màn hình máy tính. Hãy in một bản ở đúng kích thước dự kiến, đặt nó ở khoảng cách người dùng sẽ đứng và thử dưới ánh sáng tại địa điểm.

:::flow
- Quét bằng ít nhất hai điện thoại khác nhau
- Thử camera mặc định, không chỉ một ứng dụng QR riêng
- Mở bằng mạng di động để phát hiện trang quá chậm
- Kiểm tra đường dẫn cuối sau mọi lần chuyển hướng
- Nhờ một người chưa biết mục tiêu thử và nói họ nghĩ mã dùng để làm gì
:::

## Kích thước bao nhiêu là đủ?

Không có một con số đúng cho mọi bối cảnh vì khoảng cách quét và mật độ dữ liệu khác nhau. Một mã trên menu để bàn có thể nhỏ hơn mã trên poster. Nguyên tắc hữu ích là tăng kích thước khi người dùng đứng xa, và luôn thử trên vật liệu thật trước khi in số lượng lớn.

Đường dẫn càng dài, mã càng dày. Nếu mã quá phức tạp, hãy cân nhắc một URL ngắn ổn định trên tên miền bạn kiểm soát, thay vì dịch vụ rút gọn có thể hết hạn.

## Checklist trước khi gửi nhà in

- Trang đích mở được khi chưa đăng nhập
- Nội dung trên trang đích đúng với nhãn cạnh mã
- Mã có khoảng trắng bao quanh
- Độ tương phản đủ mạnh
- Tệp có độ phân giải hoặc định dạng phù hợp
- Đã quét bản in thử bằng nhiều thiết bị
- Có người chịu trách nhiệm cập nhật trang đích

Mã QR không sửa được một trang đích kém. Hãy dành thời gian cho trải nghiệm sau khi quét: trang tải nhanh, chữ dễ đọc trên điện thoại và hành động chính xuất hiện ngay. Đó mới là phần biến một ô vuông trên poster thành công cụ hữu ích.`
  }
];

export function getViPost(slug) { return viBlogPosts.find((post) => post.slug === slug); }
export function getViPostByEnglishSlug(slug) { return viBlogPosts.find((post) => post.alternateEn === slug); }
