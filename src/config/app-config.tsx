import {
  FaHouse,
  FaCalendar,
  FaMessage,
  FaCat,
  FaPaw,
  FaInfo,
  FaNewspaper,
  FaQuestion,
  FaDollarSign,
  FaHeartPulse,
  FaClock,
} from "react-icons/fa6";

export const appConfig = {
  views: {
    home: {
      user: [
        {
          title: "Whiskers AI",
          description: "AI-powered pet support",
          href: "/user/whiskers",
          icon: <FaCat className="h-5 w-5 text-primary" />,
        },
        {
          title: "Emergency",
          description: "Urgent pet care anytime",
          href: "/user/emergency",
          icon: <FaHeartPulse className="h-5 w-5 text-primary" />,
        },
      ],
      provider: [
        {
          title: "My Appointments",
          description: "Keep track of your appointments.",
          href: "/business/appointments",
          icon: <FaCalendar className="h-5 w-5 text-primary" />,
        },
        {
          title: "Client History",
          description: "Appointment history",
          href: "/business/history",
          icon: <FaClock className="h-5 w-5 text-primary" />,
        },
      ],
    },
  },
  navigation: {
    user: [
      {
        title: "Home",
        href: "/user/home",
        icon: <FaHouse className="text-primary" />,
      },
      {
        title: "Pets",
        href: "/user/pets",
        icon: <FaPaw className="text-primary" />,
      },
      {
        title: "Booking",
        href: "/user/appointments",
        icon: <FaCalendar className="text-primary" />,
      },
    ],
    provider: [
      {
        title: "Home",
        href: "/business/home",
        icon: <FaHouse className="text-primary" />,
      },
      {
        title: "Booking",
        href: "/business/appointments",
        icon: <FaCalendar className="text-primary" />,
      },
      {
        title: "Client History",
        description: "Appointment history",
        href: "/business/history",
        icon: <FaClock className="h-5 w-5 text-primary" />,
      },
    ],
  },
  servicesAndPricing: [
    {
      title: "Services & Pricing",
      icon: <FaDollarSign className="text-primary" />,
      href: "/business/services",
    },
  ],
  legalInformation: [
    {
      title: "About Petmate",
      icon: <FaInfo className="text-primary" />,
      href: "/about",
    },
    {
      title: "Terms and Conditions",
      icon: <FaNewspaper className="text-primary" />,
      href: "/terms-and-conditions",
    },
    {
      title: "Privacy and Notice",
      icon: <FaNewspaper className="text-primary" />,
      href: "/privacy-and-notice",
    },
  ],
  customerSupport: [
    {
      title: "Frequently Asked Questions",
      icon: <FaQuestion className="text-primary" />,
      href: "/faq",
    },
    {
      title: "Feedback",
      icon: <FaMessage className="text-primary" />,
      href: "/feedback",
    },
  ],
};
