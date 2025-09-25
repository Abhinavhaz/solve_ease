import { gsap } from 'gsap'

// Card entrance animation
export const animateCardEntrance = (element: HTMLElement, delay: number = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay,
      ease: 'power2.out'
    }
  )
}

// Card hover animation
export const animateCardHover = (element: HTMLElement, isHovering: boolean) => {
  gsap.to(element, {
    y: isHovering ? -8 : 0,
    scale: isHovering ? 1.02 : 1,
    duration: 0.3,
    ease: 'power2.out'
  })
}

// Page transition animation
export const animatePageTransition = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }
  )
}

// Loading animation
export const animateLoading = (element: HTMLElement) => {
  gsap.to(element, {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: 'none'
  })
}

// Stagger animation for multiple elements
export const animateStagger = (elements: HTMLElement[], delay: number = 0.1) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: delay,
      ease: 'power2.out'
    }
  )
}

// Filter animation
export const animateFilterChange = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    {
      opacity: 0.5,
      scale: 0.98
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    }
  )
}
