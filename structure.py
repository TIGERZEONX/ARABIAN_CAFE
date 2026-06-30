import os

PROJECT_NAME = "Arabian-Cafe-Billing-System"

folders = [

# ============================================================
# ROOT
# ============================================================

PROJECT_NAME,

f"{PROJECT_NAME}/docs",
f"{PROJECT_NAME}/database",
f"{PROJECT_NAME}/uploads",
f"{PROJECT_NAME}/logs",

# ============================================================
# BACKEND
# ============================================================

f"{PROJECT_NAME}/backend",

f"{PROJECT_NAME}/backend/src",

# config
f"{PROJECT_NAME}/backend/src/config",

# database
f"{PROJECT_NAME}/backend/src/database",

# middleware
f"{PROJECT_NAME}/backend/src/middleware",

# models
f"{PROJECT_NAME}/backend/src/models",

# controllers
f"{PROJECT_NAME}/backend/src/controllers",

# services
f"{PROJECT_NAME}/backend/src/services",

# routes
f"{PROJECT_NAME}/backend/src/routes",

# validators
f"{PROJECT_NAME}/backend/src/validators",

# utils
f"{PROJECT_NAME}/backend/src/utils",

# constants
f"{PROJECT_NAME}/backend/src/constants",

# helpers
f"{PROJECT_NAME}/backend/src/helpers",

# sockets
f"{PROJECT_NAME}/backend/src/socket",

# cron jobs
f"{PROJECT_NAME}/backend/src/jobs",

# uploads
f"{PROJECT_NAME}/backend/uploads",

# ============================================================
# SUPER ADMIN PANEL
# ============================================================

f"{PROJECT_NAME}/super-admin",

f"{PROJECT_NAME}/super-admin/public",

f"{PROJECT_NAME}/super-admin/src",

f"{PROJECT_NAME}/super-admin/src/assets",
f"{PROJECT_NAME}/super-admin/src/assets/images",
f"{PROJECT_NAME}/super-admin/src/assets/icons",
f"{PROJECT_NAME}/super-admin/src/assets/fonts",

# atomic design

f"{PROJECT_NAME}/super-admin/src/components",

f"{PROJECT_NAME}/super-admin/src/components/atoms",
f"{PROJECT_NAME}/super-admin/src/components/molecules",
f"{PROJECT_NAME}/super-admin/src/components/organisms",
f"{PROJECT_NAME}/super-admin/src/components/templates",
f"{PROJECT_NAME}/super-admin/src/components/pages",

# layouts
f"{PROJECT_NAME}/super-admin/src/layouts",

# routes
f"{PROJECT_NAME}/super-admin/src/routes",

# hooks
f"{PROJECT_NAME}/super-admin/src/hooks",

# services
f"{PROJECT_NAME}/super-admin/src/services",

# context
f"{PROJECT_NAME}/super-admin/src/context",

# redux
f"{PROJECT_NAME}/super-admin/src/store",

# utils
f"{PROJECT_NAME}/super-admin/src/utils",

# constants
f"{PROJECT_NAME}/super-admin/src/constants",

# theme
f"{PROJECT_NAME}/super-admin/src/theme",

# styles
f"{PROJECT_NAME}/super-admin/src/styles",

# pages
f"{PROJECT_NAME}/super-admin/src/pages",

# ============================================================
# MOBILE APP
# ============================================================

f"{PROJECT_NAME}/mobile-app",

f"{PROJECT_NAME}/mobile-app/android",
f"{PROJECT_NAME}/mobile-app/ios",

f"{PROJECT_NAME}/mobile-app/src",

# assets

f"{PROJECT_NAME}/mobile-app/src/assets",
f"{PROJECT_NAME}/mobile-app/src/assets/images",
f"{PROJECT_NAME}/mobile-app/src/assets/icons",
f"{PROJECT_NAME}/mobile-app/src/assets/fonts",

# atomic

f"{PROJECT_NAME}/mobile-app/src/components",

f"{PROJECT_NAME}/mobile-app/src/components/atoms",
f"{PROJECT_NAME}/mobile-app/src/components/molecules",
f"{PROJECT_NAME}/mobile-app/src/components/organisms",
f"{PROJECT_NAME}/mobile-app/src/components/templates",
f"{PROJECT_NAME}/mobile-app/src/components/pages",

# navigation
f"{PROJECT_NAME}/mobile-app/src/navigation",

# screens
f"{PROJECT_NAME}/mobile-app/src/screens",

# hooks
f"{PROJECT_NAME}/mobile-app/src/hooks",

# services
f"{PROJECT_NAME}/mobile-app/src/services",

# api
f"{PROJECT_NAME}/mobile-app/src/api",

# redux
f"{PROJECT_NAME}/mobile-app/src/store",

# context
f"{PROJECT_NAME}/mobile-app/src/context",

# constants
f"{PROJECT_NAME}/mobile-app/src/constants",

# utils
f"{PROJECT_NAME}/mobile-app/src/utils",

# theme
f"{PROJECT_NAME}/mobile-app/src/theme",

# styles
f"{PROJECT_NAME}/mobile-app/src/styles",

# ============================================================
# SHARED
# ============================================================

f"{PROJECT_NAME}/shared",
f"{PROJECT_NAME}/shared/types",
f"{PROJECT_NAME}/shared/constants",
f"{PROJECT_NAME}/shared/utils",
]

files = [

# ============================================================
# ROOT
# ============================================================

f"{PROJECT_NAME}/README.md",
f"{PROJECT_NAME}/.gitignore",

# ============================================================
# BACKEND
# ============================================================

f"{PROJECT_NAME}/backend/package.json",
f"{PROJECT_NAME}/backend/.env",
f"{PROJECT_NAME}/backend/server.js",

f"{PROJECT_NAME}/backend/src/app.js",

f"{PROJECT_NAME}/backend/src/config/db.js",

f"{PROJECT_NAME}/backend/src/routes/index.js",

f"{PROJECT_NAME}/backend/src/controllers/auth.controller.js",
f"{PROJECT_NAME}/backend/src/controllers/user.controller.js",

f"{PROJECT_NAME}/backend/src/services/auth.service.js",
f"{PROJECT_NAME}/backend/src/services/user.service.js",

f"{PROJECT_NAME}/backend/src/models/User.js",

f"{PROJECT_NAME}/backend/src/routes/auth.routes.js",
f"{PROJECT_NAME}/backend/src/routes/user.routes.js",

f"{PROJECT_NAME}/backend/src/middleware/auth.middleware.js",

f"{PROJECT_NAME}/backend/src/utils/response.js",

# ============================================================
# REACT
# ============================================================

f"{PROJECT_NAME}/super-admin/package.json",
f"{PROJECT_NAME}/super-admin/.env",
f"{PROJECT_NAME}/super-admin/src/App.jsx",
f"{PROJECT_NAME}/super-admin/src/main.jsx",

# ============================================================
# REACT NATIVE
# ============================================================

f"{PROJECT_NAME}/mobile-app/package.json",
f"{PROJECT_NAME}/mobile-app/.env",
f"{PROJECT_NAME}/mobile-app/App.js",

]

for folder in folders:
    os.makedirs(folder, exist_ok=True)

for file in files:
    with open(file, "w") as f:
        pass

print("=" * 60)
print("Arabian Cafe Billing System Architecture Created Successfully")
print("=" * 60)
print(PROJECT_NAME)