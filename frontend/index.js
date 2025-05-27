import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './src/index.css';
import GetStarted from "./src/pages/GetStartedPage"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// SEO-Enhanced Router Configuration with meta data
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    // Add route-specific SEO data
    handle: {
      seo: {
        title: "Sankalp Training Program 2.0 | SpectoV Internship & Job Opportunities",
        description: "Join Sankalp Training Program 2.0 by SpectoV. Comprehensive training, internship opportunities, and job placements.",
        keywords: "sankalp training program, sankalp spectov, spectov internship, sankalp internship",
        canonical: "/"
      }
    }
  },
  {
    path: "/getstarted",
    element: <GetStarted/>,
    handle: {
      seo: {
        title: "Get Started with Sankalp Training | SpectoV Internship Application",
        description: "Start your journey with Sankalp training program. Apply for SpectoV internship and explore sankalp job opportunities today.",
        keywords: "sankalp training application, spectov internship application, get started sankalp, join sankalp program",
        canonical: "/getstarted"
      }
    }
  },
  // Additional SEO-friendly routes for better keyword targeting
  {
    path: "/sankalp-training-program",
    element: <App/>, // You can redirect this to main page or create dedicated component
    handle: {
      seo: {
        title: "Sankalp Training Program | Professional Development by SpectoV",
        description: "Comprehensive Sankalp training program offering professional development, technical skills, and career advancement opportunities.",
        keywords: "sankalp training program, professional training, career development, spectov training",
        canonical: "/sankalp-training-program"
      }
    }
  },
  {
    path: "/spectov-internship",
    element: <GetStarted/>, // Can redirect to get started or create dedicated page
    handle: {
      seo: {
        title: "SpectoV Internship Program | Sankalp Internship Opportunities",
        description: "Apply for SpectoV internship through Sankalp program. Gain practical experience and industry exposure with leading companies.",
        keywords: "spectov internship, sankalp internship, internship opportunities, professional internship",
        canonical: "/spectov-internship"
      }
    }
  },
  {
    path: "/sankalp-job-opportunities",
    element: <GetStarted/>, // Can redirect or create dedicated careers page
    handle: {
      seo: {
        title: "Sankalp Job Opportunities | Career Placement through SpectoV",
        description: "Explore sankalp job opportunities and career placements. Get hired through our comprehensive training and placement program.",
        keywords: "sankalp job opportunities, career placement, job openings, spectov careers",
        canonical: "/sankalp-job-opportunities"
      }
    }
  }
]);

// SEO utility functions
const updatePageSEO = (route) => {
  if (route?.handle?.seo) {
    const { title, description, keywords, canonical } = route.handle.seo;
    
    // Update document title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://sankalp.spectov.in${canonical}`);
    }
    
    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('href', `https://sankalp.spectov.in${canonical}`);
    }
  }
};

// Add SEO tracking and analytics
const trackPageView = (path) => {
  // Add your analytics tracking here
  console.log(`Page view tracked: ${path}`);
  
  // Example: Google Analytics tracking (uncomment when you add GA)
  // if (typeof gtag !== 'undefined') {
  //   gtag('config', 'GA_MEASUREMENT_ID', {
  //     page_path: path
  //   });
  // }
};

// Enhanced router with SEO capabilities
const EnhancedRouterProvider = ({ router }) => {
  return <RouterProvider router={router} />;
};

// Add structured data for breadcrumbs dynamically
const addBreadcrumbStructuredData = (path) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": []
  };
  
  const pathSegments = path.split('/').filter(segment => segment);
  let currentPath = '';
  
  // Always add home
  breadcrumbData.itemListElement.push({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://sankalp.spectov.in/"
  });
  
  // Add path segments
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    breadcrumbData.itemListElement.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `https://sankalp.spectov.in${currentPath}`
    });
  });
  
  // Remove existing breadcrumb script if any
  const existingScript = document.querySelector('script[data-breadcrumb]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new breadcrumb structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-breadcrumb', 'true');
  script.textContent = JSON.stringify(breadcrumbData);
  document.head.appendChild(script);
};

// Listen for route changes and update SEO
window.addEventListener('popstate', () => {
  const currentPath = window.location.pathname;
  trackPageView(currentPath);
  addBreadcrumbStructuredData(currentPath);
});

// Initial page load tracking
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  trackPageView(currentPath);
  addBreadcrumbStructuredData(currentPath);
});

// Performance monitoring for SEO
const measurePerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        const domLoadTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
        
        console.log('SEO Performance Metrics:', {
          loadTime: `${loadTime}ms`,
          domLoadTime: `${domLoadTime}ms`,
          firstContentfulPaint: performance.getEntriesByType('paint')[0]?.startTime
        });
        
        // You can send this data to your analytics service
      }, 0);
    });
  }
};

// Initialize performance monitoring
measurePerformance();

// Add sitemap generation helper (for dynamic routes)
const generateSitemapData = () => {
  const sitemapUrls = routes.routes?.map(route => ({
    url: `https://sankalp.spectov.in${route.path}`,
    changefreq: route.path === '/' ? 'daily' : 'weekly',
    priority: route.path === '/' ? '1.0' : '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  }));
  
  return sitemapUrls;
};

// Cross-domain SEO optimization for parent-child relationship
const addParentDomainSignals = () => {
  // Add reference to parent domain for SEO benefit
  const parentDomainReference = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SpectoV",
    "url": "https://spectov.in",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Training Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Sankalp Training Program 2.0",
            "url": "https://sankalp.spectov.in",
            "provider": {
              "@type": "Organization",
              "name": "SpectoV"
            }
          }
        }
      ]
    }
  };
  
  // Add parent domain structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-parent-domain', 'true');
  script.textContent = JSON.stringify(parentDomainReference);
  document.head.appendChild(script);
};

// Initialize parent domain signals
addParentDomainSignals();

// Export sitemap data for potential use
window.sitemapData = generateSitemapData();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EnhancedRouterProvider router={routes} />
  </StrictMode>
);