# Portfolio Cá Nhân với Admin Panel

Website portfolio tự lưu trữ được xây dựng bằng Next.js 14, SQLite và NextAuth.js.

## Tính Năng

- **100% Local**: Database SQLite, lưu trữ file cục bộ, không phụ thuộc dịch vụ bên ngoài
- **Admin Panel**: Quản lý profile và dự án
- **Xác Thực**: Đăng nhập bảo mật với NextAuth.js
- **Upload Hình Ảnh**: Lưu trữ file cục bộ trong `public/uploads`
- **Upload Nhạc Nền**: Tải lên và phát nhạc nền cho portfolio
- **Social Media Icons**: Icons đẹp cho các mạng xã hội (GitHub, LinkedIn, Twitter, Facebook, YouTube, TikTok)
- **UI Hiện Đại**: Giao diện với hiệu ứng chuyên nghiệp
  - Gradient backgrounds với animated blobs
  - Fade-in animations
  - Hover effects mượt mà
  - Glassmorphism effects
  - Responsive design

## Cài Đặt

1. **Cài Đặt Dependencies**
   ```bash
   npm install
   ```

2. **Thiết Lập Biến Môi Trường**
   
   Sao chép `.env.example` thành `.env` và điền các giá trị:
   ```bash
   cp .env.example .env
   ```
   
   Cập nhật file `.env`:
   ```env
   DATABASE_URL="file:./dev.db"
   AUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="your-secure-password"
   ```
   
   Tạo AUTH_SECRET (PowerShell):
   ```powershell
   [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
   ```

3. **Khởi Tạo Database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Tạo Thư Mục Uploads**
   ```bash
   mkdir -p public/uploads
   touch public/uploads/.gitkeep
   ```

5. **Chạy Development Server**
   ```bash
   npm run dev
   ```

6. **Truy Cập Ứng Dụng**
   - Portfolio Công Khai: http://localhost:3000
   - Đăng Nhập Admin: http://localhost:3000/login
   - Admin Dashboard: http://localhost:3000/admin

## Cấu Trúc Dự Án

```
├── app/
│   ├── admin/                      # Admin dashboard
│   │   ├── layout.tsx              # Layout admin với navigation
│   │   ├── page.tsx                # Quản lý profile
│   │   └── projects/               # CRUD dự án
│   │       ├── page.tsx            # Danh sách và tạo dự án
│   │       └── [id]/
│   │           └── page.tsx        # Chỉnh sửa dự án
│   ├── api/
│   │   ├── auth/                   # NextAuth routes
│   │   │   └── [...nextauth]/
│   │   └── upload/                 # API upload file (images & audio)
│   ├── login/                      # Trang đăng nhập
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Portfolio công khai
│   └── globals.css                 # Global styles với animations
├── components/
│   ├── image-upload.tsx            # Component upload hình ảnh
│   ├── audio-upload-field.tsx      # Component upload nhạc nền
│   ├── avatar-upload-field.tsx     # Component upload avatar
│   ├── background-music.tsx        # Player nhạc nền
│   ├── social-icons.tsx            # Icons mạng xã hội
│   ├── project-form.tsx            # Form tạo/sửa dự án
│   └── delete-project-button.tsx   # Nút xóa dự án
├── lib/
│   ├── actions.ts                  # Server actions
│   └── prisma.ts                   # Prisma client singleton
├── prisma/
│   └── schema.prisma               # Database schema (SQLite)
├── public/
│   └── uploads/                    # Thư mục lưu file upload (images & audio)
├── auth.ts                         # Cấu hình NextAuth
└── middleware.ts                   # Bảo vệ routes
```

## Hướng Dẫn Sử Dụng

### Đăng Nhập Admin
Sử dụng thông tin đăng nhập từ file `.env` để đăng nhập tại `/login`.

### Quản Lý Profile
1. Truy cập `/admin`
2. Điền thông tin profile:
   - Tên, Email, Bio
   - Avatar (upload hoặc URL)
   - **Social Media Links**: GitHub, LinkedIn, Twitter, Facebook, YouTube, TikTok, Website
   - **Nhạc Nền**: Upload file audio (MP3, WAV, etc.) hoặc nhập URL
3. Click "Save Profile"

### Quản Lý Dự Án
1. Truy cập `/admin/projects`
2. Điền thông tin dự án:
   - Tiêu đề, Mô tả
   - Hình ảnh (upload hoặc URL)
   - URL dự án, GitHub URL
   - Tech Stack (phân cách bằng dấu phẩy)
   - Đánh dấu Featured nếu muốn
3. Click "Create Project" hoặc "Update Project"

### Xem Portfolio
Truy cập trang chủ (`/`) để xem portfolio công khai với:
- Profile và avatar
- **Icons mạng xã hội** với hiệu ứng hover
- Danh sách dự án với hiệu ứng hiện đại
- **Nhạc nền** (nếu đã cài đặt) - có nút play/pause ở góc dưới bên phải
- Responsive design cho mọi thiết bị

## Quản Lý Database

- **Xem Database**: `npm run db:studio`
- **Reset Database**: Xóa file `dev.db` và chạy `npx prisma db push`

## Schema Database

**Model Profile** bao gồm:
- Thông tin cơ bản: `name`, `email`, `bio`, `avatar`
- Social Media: `github`, `linkedin`, `twitter`, `facebook`, `youtube`, `tiktok`, `website`
- Nhạc nền: `backgroundMusic`

**Model Project** bao gồm:
- `title`, `description`, `image`
- `url`, `githubUrl`
- `techStack` (chuỗi phân cách bằng dấu phẩy)
- `featured` (boolean)

## Tính Năng UI Mới

### Hiệu Ứng Hiện Đại
- **Animated Background Blobs**: Các blob màu gradient chuyển động mượt mà
- **Fade-in Animations**: Hiệu ứng xuất hiện từ từ cho các phần tử
- **Hover Effects**: 
  - Cards nâng lên khi hover
  - Images scale khi hover
  - Shadow tăng cường
- **Glassmorphism**: Hiệu ứng kính mờ cho header, cards
- **Gradient Text**: Tiêu đề với gradient màu sắc

### Social Icons
- Icons SVG được tối ưu cho từng mạng xã hội
- Màu sắc phù hợp với brand
- Hover effects mượt mà

### Background Music
- Upload file audio (MP3, WAV, OGG, etc.)
- Auto-play (với quyền của trình duyệt)
- Nút điều khiển floating ở góc dưới bên phải
- Volume mặc định 30%

## Bảo Mật

- Thay đổi thông tin đăng nhập admin trong môi trường production
- Sử dụng AUTH_SECRET mạnh
- Giữ file `.env` bí mật và không commit lên Git
- Xem xét thêm rate limiting cho endpoint upload trong production
- Validate file types và sizes (Images: 5MB max, Audio: 10MB max)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite với Prisma ORM
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG icons
- **File Storage**: Local filesystem (`public/uploads`)

## Hỗ Trợ

Nếu gặp vấn đề, hãy:
1. Kiểm tra file `.env` đã được cấu hình đúng
2. Chạy `npx prisma db push` để cập nhật schema
3. Đảm bảo thư mục `public/uploads` có quyền ghi
4. Kiểm tra console trong trình duyệt và terminal
