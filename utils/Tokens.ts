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
export const modalButtonContainer = "flex flex-col sm:flex-row gap-3 pt-4"
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