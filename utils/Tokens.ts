// ============================================
// DESIGN TOKENS - COLOR SYSTEM
// ============================================
export const colors = {
  primary: {
    dark: "#0a1445",
    base: "#0a174e",
    light: "#233876",
  },
  secondary: {
    dark: "#222a54",
    base: "#2a2f4a",
    light: "#1a1f3a",
  },
  accent: {
    base: "#b6a253",
    light: "#d4c373",
    gold: "#E2C044",
    goldHover: "#ffd700",
  },
  neutral: {
    white: "#ffffff",
    gray50: "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray600: "#4b5563",
    gray700: "#374151",
    gray800: "#1f2937",
    black: "#000000",
  },
  semantic: {
    error: "#dc2626",
    errorLight: "#fca5a5",
    success: "#10b981",
    successLight: "#6ee7b7",
    warning: "#f59e0b",
    info: "#3b82f6",
  },
} as const;

// ============================================
// DESIGN TOKENS - SPACING SYSTEM
// ============================================
export const spacing = {
  section: {
    padding: "py-12 sm:py-16 lg:py-20",
    paddingX: "px-4 sm:px-6 lg:px-8",
    container: "w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8",
  },
  card: {
    padding: "p-4 sm:p-5 lg:p-6",
    paddingLarge: "p-6 sm:p-8",
  },
  gap: {
    small: "gap-2 sm:gap-3",
    medium: "gap-4 sm:gap-6",
    large: "gap-6 sm:gap-8 lg:gap-10",
    xlarge: "gap-8 sm:gap-12 lg:gap-16",
  },
} as const;

// ============================================
// DESIGN TOKENS - TYPOGRAPHY
// ============================================
export const typography = {
  sectionTitle: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.3em] text-[#0a174e] text-center",
  sectionSubtitle: "text-base sm:text-lg md:text-xl lg:text-2xl text-[#233876] leading-relaxed",
  cardTitle: "text-lg sm:text-xl lg:text-2xl font-bold",
  cardDescription: "text-sm sm:text-base text-gray-600",
  body: "text-sm sm:text-base leading-relaxed",
  bodyLarge: "text-base sm:text-lg leading-relaxed",
  button: "text-sm sm:text-base font-bold",
} as const;

// ============================================
// DESIGN TOKENS - BUTTONS
// ============================================
export const buttons = {
  primary: "bg-[#E2C044] hover:bg-[#ffd700] text-[#0a174e] border-none rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-bold cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E2C044] focus:ring-offset-2",
  primaryFull: "bg-[#E2C044] hover:bg-[#ffd700] text-[#0a174e] border-none rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E2C044] focus:ring-offset-2 w-full sm:w-auto",
  secondary: "bg-[#0a174e] hover:bg-[#222a54] text-white border-none rounded-lg px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#b6a253]",
  carousel: "bg-black/40 hover:bg-black/60 text-white border-none rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-lg sm:text-xl md:text-2xl cursor-pointer flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50",
} as const;

// ============================================
// DESIGN TOKENS - CARDS
// ============================================
export const cards = {
  roomCard: "w-full max-w-[350px] h-[400px] sm:h-[450px] rounded-xl shadow-lg overflow-hidden relative flex flex-col justify-between items-start text-white text-left p-4 sm:p-5 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.03] mx-auto",
  roomCardHorizontal: "w-full flex flex-col sm:flex-row rounded-lg shadow-md overflow-hidden bg-white hover:shadow-xl transition-shadow duration-200 ease-in-out border border-gray-200",
  serviceCard: "group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-[#b6a253] overflow-hidden",
  amenityCard: "flex flex-col items-center w-full sm:w-auto sm:min-w-[250px] lg:min-w-[300px]",
} as const;

// ============================================
// DESIGN TOKENS - STATES
// ============================================
export const states = {
  loading: "w-full bg-white py-12 sm:py-16 lg:py-20 px-4 text-center",
  loadingText: "text-lg sm:text-xl lg:text-2xl text-[#0a174e]",
  error: "w-full bg-white py-12 sm:py-16 lg:py-20 px-4 text-center",
  errorText: "text-lg sm:text-xl lg:text-2xl text-red-600",
  empty: "w-full bg-white py-12 sm:py-16 lg:py-20 px-4 text-center",
  emptyText: "text-lg sm:text-xl lg:text-2xl text-[#0a174e]",
} as const;

// ============================================
// DESIGN TOKENS - CAROUSEL
// ============================================
export const carousel = {
  container: "relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-screen max-h-[800px] overflow-hidden bg-white",
  button: "absolute top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white border-none rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-lg sm:text-xl md:text-2xl cursor-pointer flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50",
  buttonLeft: "left-2 sm:left-4 md:left-6",
  buttonRight: "right-2 sm:right-4 md:right-6",
  indicators: "absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10",
  indicator: "w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50",
  indicatorActive: "bg-[#00204A] border-2 border-[#E2C044] scale-125",
  indicatorInactive: "bg-gray-300 hover:bg-gray-400 border-2 border-transparent",
} as const;

// ============================================
// DESIGN TOKENS - SECTIONS
// ============================================
export const sections = {
  container: "w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8",
  titleContainer: "w-full max-w-[90vw] mx-auto mb-6 sm:mb-8",
  titleLine: "border-none border-t-[4px] border-[#0a174e] mb-0.5",
  titleLineThin: "border-none border-t-[2px] border-[#0a174e] mt-0",
  title: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.3em] text-[#0a174e] sm:mb-7 text-center",
  subtitle: "max-w-5xl text-center text-base sm:text-lg md:text-xl lg:text-2xl text-[#233876] mb-8 sm:mb-12 lg:mb-16 leading-relaxed px-4",
} as const;

// ============================================
// DESIGN TOKENS - GRIDS
// ============================================
export const grids = {
  rooms: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto justify-items-center",
  services: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto",
  amenities: "flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16 w-full max-w-6xl",
  stats: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto",
  quickActions: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto",
} as const;

// ============================================
// DESIGN TOKENS - ADMIN HOME
// ============================================
export const admin = {
  hero: {
    container: "bg-gradient-to-r from-[#0a1445] via-[#0a174e] to-[#222a54] text-white",
    content: "max-w-7xl mx-auto text-center py-6 sm:py-8 lg:py-10",
    title: "text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3",
    subtitle: "text-sm sm:text-base lg:text-lg text-gray-200 max-w-3xl mx-auto",
  },
  statCard: {
    container: "bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-gray-100 hover:border-[#b6a253] transition-all duration-300 transform hover:-translate-y-1",
    iconContainer: "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl mb-4 sm:mb-6 mx-auto",
    iconPrimary: "bg-gradient-to-br from-[#0a174e] to-[#222a54]",
    iconSuccess: "bg-gradient-to-br from-green-600 to-green-700",
    iconError: "bg-gradient-to-br from-red-600 to-red-700",
    value: "text-xl sm:text-2xl font-bold text-[#0a174e] text-center mb-2",
    label: "text-sm sm:text-base text-gray-600 text-center",
  },
  actionCard: {
    container: "bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-gray-100 hover:border-[#b6a253] transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col",
    iconContainer: "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl mb-4 sm:mb-6 mx-auto",
    iconPrimary: "bg-[#0a174e]",
    iconSecondary: "bg-[#222a54]",
    iconDark: "bg-[#0a1445]",
    title: "text-xl sm:text-2xl font-bold text-[#0a174e] text-center mb-2 sm:mb-3",
    description: "text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6 flex-grow",
  },
  infoCard: {
    container: "bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border-2 border-gray-100",
    text: "text-base sm:text-lg text-gray-700 leading-relaxed",
  },
  page: {
    container: "min-h-screen bg-gray-100",
    contentWrapper: "max-w-7xl mx-auto",
    cardContainer: "bg-white rounded-2xl shadow-xl border-2 overflow-hidden",
  },
  loading: {
    container: "min-h-screen bg-gray-100 flex items-center justify-center",
    spinner: "animate-spin rounded-full h-12 w-12 border-b-2 mx-auto",
    text: "mt-4 font-semibold text-sm sm:text-base",
  },
  table: {
    container: "overflow-x-auto",
    wrapper: "min-w-full divide-y divide-gray-200",
    header: "bg-[#0a1445]",
    headerCell: "px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider",
    body: "bg-white divide-y divide-gray-200",
    row: "hover:bg-gray-50",
    cell: "px-4 py-4 whitespace-nowrap text-sm",
    cellText: "text-gray-900",
    cellTextSecondary: "text-gray-600",
    actionCell: "px-4 py-4 whitespace-nowrap text-right text-sm font-medium",
  },
  badge: {
    base: "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
    admin: "bg-purple-100 text-purple-800",
    recepcionista: "bg-blue-100 text-blue-800",
    cliente: "bg-green-100 text-green-800",
    default: "bg-gray-100 text-gray-800",
  },
  alert: {
    error: "bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6",
    errorText: "font-semibold",
  },
  emptyState: {
    container: "text-center py-12 bg-gray-50 rounded-lg",
    text: "text-gray-600 text-lg",
  },
  crud: {
    container: "p-4 sm:p-6 lg:p-8",
    header: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4",
    title: "text-xl sm:text-2xl font-bold",
    subtitle: "text-gray-600 mt-1 text-sm sm:text-base",
    button: "w-full sm:w-auto",
  },
} as const;

// ============================================
// LEGACY TOKENS (mantener compatibilidad)
// ============================================
export const standardInput = "mt-1 w-full border border-gray-400 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"

// Header styles
export const headerLinkBase = "text-white text-lg font-light px-10 h-[60px] flex items-center"
export const headerLinkSeparator = "border-r-[1px] border-white"

// Form styles
export const formFieldContainer = "space-y-1"
export const formLabel = "block text-sm font-medium text-white"
export const formErrorText = "text-sm text-red-400"
export const formErrorTextCenter = "text-sm text-red-400 text-center"
export const formSuccessText = "text-sm text-green-400 text-center"

// Login form styles
export const loginCardBg = "bg-[#2a2f4a]"
export const loginCardContainer = "w-full bg-[#2a2f4a] rounded-lg shadow-2xl p-8 lg:p-10"
export const loginTitle = "text-2xl font-semibold text-white text-center mb-2"
export const loginTextLink = "text-white hover:text-[#b6a253]"
export const loginTextLinkSmall = "text-sm text-white hover:text-[#b6a253]"

// Input styles
export const darkInputBase = "mt-1 w-full border border-gray-600 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#b6a253] focus:border-[#b6a253] bg-[#1a1f3a] text-white placeholder-gray-400"
export const darkInputError = "border-red-500 focus:ring-red-500"

// Section title styles - Global token for section headings (COMODIDADES, HABITACIONES, etc.)
export const sectionTitle = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.3em] text-[#0a174e] sm:mb-7 text-center"

export const modalBackdrop = "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-opacity"
export const modalBackdropGradient = "linear-gradient(135deg, rgba(10, 20, 69, 0.95) 0%, rgba(34, 42, 84, 0.9) 50%, rgba(10, 20, 69, 0.95) 100%)"
export const modalContainer = "bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 transform transition-all border-4 border-white/20"
export const modalHeader = "flex items-center justify-between p-6 border-b-[3px] border-[#b6a253] bg-[#0a1445]"
export const modalTitle = "text-2xl font-bold text-white"
export const modalCloseButton = "text-[#b6a253] hover:text-white transition-colors p-2 hover:bg-[#222a54] rounded-full"
export const modalContent = "p-6"
export const modalWarningIcon = "text-6xl mb-4"
export const modalWarningText = "text-lg font-semibold text-gray-800 mb-2"
export const modalWarningTextHighlight = "text-[#0a1445] font-bold"
export const modalWarningSubtext = "text-sm text-red-600 font-medium"
export const modalSuccessIcon = "text-6xl mb-4"
export const modalSuccessText = "text-lg font-semibold text-gray-800"
export const modalErrorIcon = "text-6xl mb-4"
export const modalErrorText = "text-lg font-semibold text-gray-800"
export const modalErrorSubtext = "text-sm text-red-600 font-medium"
export const modalButtonContainer = "flex flex-col sm:flex-row gap-3 pt-4"
export const modalButtonError = "flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-red-500 hover:border-red-400 transform hover:scale-105"
export const modalButtonPrimary = "flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-red-500 hover:border-red-400 disabled:border-red-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:transform-none"
export const modalButtonSecondary = "flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-400 hover:border-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:transform-none"
export const modalButtonSuccess = "flex-1 bg-gradient-to-r from-[#0a1445] to-[#222a54] hover:from-[#222a54] hover:to-[#0a1445] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#b6a253] hover:border-[#d4c373] disabled:border-[#b6a253] disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:transform-none"

// Service card styles - Design tokens for service cards
export const serviceCardContainer = "group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-[#b6a253] overflow-hidden"
export const serviceCardIconContainer = "w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-4 sm:mb-5 flex items-center justify-center rounded-full bg-gradient-to-br from-[#0a1445] to-[#222a54] group-hover:from-[#222a54] group-hover:to-[#0a1445] transition-all duration-300 shadow-lg group-hover:scale-110"
export const serviceCardIcon = "text-4xl sm:text-5xl lg:text-6xl"
export const serviceCardTitle = "text-lg sm:text-xl lg:text-2xl font-bold text-[#0a1445] text-center mb-2 group-hover:text-[#b6a253] transition-colors duration-300"
export const serviceCardDescription = "text-sm sm:text-base text-gray-600 text-center px-4 pb-4"
export const servicesSectionContainer = "w-full bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
export const servicesGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto"

// Restaurant & Bar styles - Design tokens
export const restaurantHeroSection = "relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[400px] sm:min-h-[500px]"
export const restaurantHeroOverlay = "absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"
export const restaurantHeroTitle = "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl px-4 text-center"
export const restaurantSectionContainer = "w-full bg-gradient-to-b from-white via-gray-50 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
export const restaurantContentGrid = "grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-7xl mx-auto"
export const restaurantFeatureCard = "bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-100 hover:border-[#b6a253] p-6 sm:p-8"
export const restaurantFeatureIcon = "text-5xl sm:text-6xl mb-4 sm:mb-5"
export const restaurantFeatureTitle = "text-2xl sm:text-3xl font-bold text-[#0a1445] mb-3 sm:mb-4"
export const restaurantFeatureDescription = "text-base sm:text-lg text-gray-600 leading-relaxed mb-4"
export const restaurantFeatureList = "space-y-2 sm:space-y-3"
export const restaurantFeatureItem = "flex items-start space-x-3 text-gray-700"
export const restaurantFeatureCheck = "text-[#b6a253] text-xl sm:text-2xl flex-shrink-0 mt-1"
export const restaurantFeatureText = "text-sm sm:text-base"
export const restaurantImageContainer = "relative rounded-2xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[500px]"
export const restaurantInfoCard = "bg-gradient-to-br from-[#0a1445] to-[#222a54] rounded-2xl shadow-2xl p-6 sm:p-8 text-white"
export const restaurantInfoTitle = "text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#b6a253]"
export const restaurantInfoText = "text-base sm:text-lg leading-relaxed mb-4"
export const restaurantScheduleItem = "flex justify-between items-center py-3 sm:py-4 border-b border-white/20 last:border-0"
export const restaurantScheduleDay = "text-lg sm:text-xl font-semibold"
export const restaurantScheduleTime = "text-base sm:text-lg text-[#b6a253] font-medium"

// ============================================
// DESIGN TOKENS - ADMIN PAGES
// ============================================
export const adminPage = {
  container: "min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8",
  contentWrapper: "max-w-7xl mx-auto",
  cardContainer: "bg-white rounded-2xl shadow-xl border-2 border-[#222a54] overflow-hidden",
  headerContainer: "bg-white rounded-2xl shadow-xl border-2 border-[#222a54] overflow-hidden mb-6",
  headerContent: "bg-[#0a1445] border-b-[3px] border-[#b6a253] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-center",
  headerTitle: "text-xl sm:text-2xl lg:text-3xl font-bold text-white",
  headerSubtitle: "text-gray-300 mt-2 text-sm sm:text-base",
  crudContainer: "p-4 sm:p-6 lg:p-8",
  crudHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4",
  crudTitle: "text-xl sm:text-2xl font-bold text-[#0a174e]",
  crudSubtitle: "text-gray-600 mt-1 text-sm sm:text-base",
  tableWrapper: "overflow-x-auto",
  table: "min-w-full divide-y divide-gray-200",
  tableHeader: "bg-[#0a1445]",
  tableHeaderCell: "px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider",
  tableHeaderCellRight: "px-4 py-3 text-right text-xs font-medium text-white uppercase tracking-wider",
  tableRow: "bg-white divide-y divide-gray-200 hover:bg-gray-50",
  tableCell: "px-4 py-4 whitespace-nowrap text-sm text-gray-900",
  tableCellMedium: "px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
  tableCellMuted: "px-4 py-4 whitespace-nowrap text-sm text-gray-600",
  tableCellActions: "px-4 py-4 whitespace-nowrap text-right text-sm font-medium",
  emptyState: "text-center py-12 bg-gray-50 rounded-lg",
  emptyStateText: "text-gray-600 text-lg",
  actionButton: "text-[#0a174e] hover:text-[#b6a253] transition-colors",
  deleteButton: "text-red-600 hover:text-red-800 transition-colors",
  deleteButtonDisabled: "text-gray-400 cursor-not-allowed",
} as const;

// ============================================
// DESIGN TOKENS - LOADING STATES
// ============================================
export const loadingStates = {
  container: "p-8 text-center",
  spinner: "animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a174e] mx-auto",
  text: "mt-4 text-[#0a174e] font-semibold",
} as const;

// ============================================
// DESIGN TOKENS - FORM COMPONENTS
// ============================================
export const formComponents = {
  label: "text-sm font-semibold text-[#0a1445]",
  labelRequired: "text-sm font-semibold text-[#0a1445]",
  inputBase: "w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 text-sm sm:text-base bg-white text-[#0a1445] placeholder:text-gray-400",
  inputNormal: "border-[#222a54] focus:border-[#b6a253] focus:ring-[#b6a253]/20",
  inputError: "border-red-400 focus:border-red-500 focus:ring-red-200",
  errorText: "text-sm text-red-500 font-medium",
  selectBase: "w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 bg-white text-[#0a1445] cursor-pointer",
  selectNormal: "border-[#222a54] focus:border-[#b6a253] focus:ring-[#b6a253]/20",
  selectError: "border-red-400 focus:border-red-500 focus:ring-red-200",
} as const;