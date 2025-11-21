// Portfolio Interactive Features
class PortfolioInteractions {
  constructor() {
    this.init();
  }

  private init(): void {
    this.setupSmoothScrolling();
    this.setupAnimations();
    this.setupExternalLinks();
  }

  // Setup smooth scrolling for anchor links
  private setupSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(
          (anchor as HTMLAnchorElement).getAttribute('href') || ''
        );
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  // Setup intersection observer for animations
  private setupAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections and cards
    document
      .querySelectorAll('.section, .experience-card, .education-item')
      .forEach((el) => {
        observer.observe(el);
      });
  }

  // Add target="_blank" to external links
  private setupExternalLinks(): void {
    document.querySelectorAll('a[href^="http"]').forEach((link) => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  // Add scroll to top functionality
  public scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PortfolioInteractions();

    // Make available globally if needed
    (window as any).portfolio = portfolio;
  });
}

export default PortfolioInteractions;
