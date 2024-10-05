/// <reference types="vite/client" />
interface ImportMetaEnv {
	VITE_API_URL: string // 示例变量
	// 其他环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
