import { apiGet, apiPost } from './api'

export const getHomepage = () => apiGet('/api/homepage').then((res) => res.data)
export const getAboutPage = () => apiGet('/api/about').then((res) => res.data)
export const getServices = (params) => apiGet('/api/services', params).then((res) => res.data)
export const getPortfolio = (params) => apiGet('/api/portfolio', params).then((res) => res.data)
export const getTestimonials = (params) => apiGet('/api/testimonials', params).then((res) => res.data)
export const getFaq = () => apiGet('/api/faq').then((res) => res.data)
export const getContactPage = () => apiGet('/api/contact').then((res) => res.data)
export const getSettings = () => apiGet('/api/settings').then((res) => res.data)

export const submitContactMessage = (payload) =>
  apiPost('/api/contact/messages', payload).then((res) => res.data)
