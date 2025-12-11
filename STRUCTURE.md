# Project File Structure

```
portfolio/
├── app/
│   ├── admin/
│   │   ├── layout.tsx              # Admin layout with navigation
│   │   ├── page.tsx                # Profile manager page
│   │   └── projects/
│   │       ├── page.tsx            # Projects list & create
│   │       └── [id]/
│   │           └── page.tsx        # Edit project page
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts        # NextAuth API route handler
│   │   └── upload/
│   │       └── route.ts            # File upload API endpoint
│   ├── login/
│   │   └── page.tsx                # Login page
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Public portfolio homepage
│   └── globals.css                 # Global styles
├── components/
│   ├── image-upload.tsx            # Image upload component
│   └── project-form.tsx            # Project form component (create/edit)
├── lib/
│   ├── actions.ts                  # Server actions for data operations
│   └── prisma.ts                   # Prisma client singleton
├── prisma/
│   └── schema.prisma               # Database schema (SQLite)
├── public/
│   └── uploads/                    # Local file storage directory
│       └── .gitkeep
├── auth.ts                         # NextAuth configuration
├── middleware.ts                   # Route protection middleware
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── next.config.js                  # Next.js configuration
├── .gitignore                      # Git ignore rules
├── .env.example                    # Environment variables template
└── README.md                       # Project documentation
```

## Key Files Explained

### Configuration Files

- **`prisma/schema.prisma`**: Defines the SQLite database schema with `Profile` and `Project` models
- **`auth.ts`**: NextAuth v5 configuration with CredentialsProvider for local authentication
- **`middleware.ts`**: Protects `/admin` routes, redirects unauthenticated users to `/login`

### Core Functionality

- **`lib/actions.ts`**: Server actions for:
  - Profile CRUD operations
  - Project CRUD operations
  - Data fetching for public pages

- **`app/api/upload/route.ts`**: Handles file uploads, saves to `public/uploads`, returns public URL

### Pages & Routes

- **`app/page.tsx`**: Public portfolio homepage displaying profile and projects
- **`app/login/page.tsx`**: Admin login page
- **`app/admin/page.tsx`**: Profile management interface
- **`app/admin/projects/page.tsx`**: Projects list and creation interface
- **`app/admin/projects/[id]/page.tsx`**: Edit individual project

### Components

- **`components/image-upload.tsx`**: Reusable image upload component with preview
- **`components/project-form.tsx`**: Form for creating/editing projects

### Database Models

**Profile Model:**
- `id`, `name`, `email`, `bio`
- Social links: `github`, `linkedin`, `twitter`, `website`
- `avatar` (image URL)
- Timestamps

**Project Model:**
- `id`, `title`, `description`
- `image`, `url`, `githubUrl`
- `techStack` (comma-separated string)
- `featured` (boolean)
- Timestamps
