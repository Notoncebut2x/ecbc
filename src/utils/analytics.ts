declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEventClick = (eventName: string, eventTitle: string, eventLocation: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Event Link',
      event_label: eventTitle,
      event_name: eventName,
      event_location: eventLocation
    });
  }
};

export const trackNavigationClick = (page: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: page,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
}; 