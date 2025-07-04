// src/portfolioData.js

export const portfolioItemsData = [
  {
    id: 'ecommerce-website',
    icon: ['fas', 'laptop-code'], // Keep original icon for the card
    title: 'E-commerce Website',
    description: 'Modern e-commerce platform with React and Node.js', // Short description for card
    imageUrl: 'https://via.placeholder.com/800x600.png?text=E-commerce+Project', // Placeholder
    detailedDescription: `
      This project involved building a full-featured e-commerce platform from scratch.
      Users can browse products, add items to their cart, proceed through a checkout process,
      and manage their orders. The backend handles inventory, user accounts, and payment processing.
      The focus was on creating a seamless and intuitive user experience, with a responsive design
      that works across all devices.
    `,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe API'],
    liveLink: '#', // Placeholder
    sourceCodeLink: '#' // Placeholder
  },
  {
    id: 'mobile-app-design',
    icon: ['fas', 'mobile-alt'],
    title: 'Mobile App Design',
    description: 'UI/UX design for fitness tracking mobile application',
    imageUrl: 'https://via.placeholder.com/800x600.png?text=Mobile+App+Design',
    detailedDescription: `
      A comprehensive UI/UX design project for a mobile fitness tracking application.
      The process included user research, persona creation, wireframing, prototyping, and final visual design.
      Key features include activity tracking, workout planning, progress visualization, and social sharing.
      The design emphasizes ease of use and motivational elements.
    `,
    technologies: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Material Design'],
    liveLink: null, // Or remove if not applicable
    sourceCodeLink: '#'
  },
  {
    id: 'corporate-website',
    icon: ['fas', 'globe'],
    title: 'Corporate Website',
    description: 'Professional website for consulting company',
    imageUrl: 'https://via.placeholder.com/800x600.png?text=Corporate+Website',
    detailedDescription: `
      Developed a sleek and professional corporate website for a business consulting firm.
      The site showcases the company's services, team, case studies, and contact information.
      Built with a focus on SEO optimization, fast loading times, and a content management system
      for easy updates by the client.
    `,
    technologies: ['WordPress', 'PHP', 'JavaScript', 'SEO', 'Custom Theme Development'],
    liveLink: '#',
    sourceCodeLink: null
  },
  {
    id: 'dashboard-design',
    icon: ['fas', 'chart-bar'],
    title: 'Dashboard Design',
    description: 'Analytics dashboard with interactive charts',
    imageUrl: 'https://via.placeholder.com/800x600.png?text=Dashboard+Design',
    detailedDescription: `
      Designed an intuitive and powerful analytics dashboard for a SaaS product.
      The dashboard features various interactive charts, data tables, and customizable widgets
      to help users visualize key metrics and gain insights from their data.
      The design process prioritized data clarity and user efficiency.
    `,
    technologies: ['React', 'D3.js', 'Chart.js', 'UI/UX Design', 'Data Visualization'],
    liveLink: '#',
    sourceCodeLink: '#'
  },
  {
    id: 'online-store',
    icon: ['fas', 'shopping-cart'],
    title: 'Online Store',
    description: 'Custom e-commerce solution with payment integration',
    imageUrl: 'https://via.placeholder.com/800x600.png?text=Online+Store',
    detailedDescription: `
      Built a bespoke online store for a boutique retailer, featuring custom product pages,
      secure payment gateway integration, and an order management system.
      The platform was designed to reflect the brand's unique identity and provide a smooth shopping experience.
    `,
    technologies: ['Shopify API', 'Liquid', 'JavaScript', 'Payment Gateways', 'UX Design'],
    liveLink: '#',
    sourceCodeLink: null
  },
  {
    id: 'learning-platform',
    icon: ['fas', 'book'],
    title: 'Learning Platform',
    description: 'Online education platform with video streaming',
    imageUrl: 'https://via.placeholder.com/800x600.png?text=Learning+Platform',
    detailedDescription: `
      Developed an online learning platform offering video courses, quizzes, and progress tracking.
      The system includes user authentication, course enrollment, video streaming capabilities,
      and a teacher dashboard for managing content.
    `,
    technologies: ['Vue.js', 'Firebase', 'Node.js', 'Video.js', 'REST APIs'],
    liveLink: '#',
    sourceCodeLink: '#'
  }
];
