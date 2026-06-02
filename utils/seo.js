const generateSEO = ({
    title,
    description,
    keywords = [],
    image = "",
    url = "",
  }) => {
    return {
      metaTitle:
        title ||
        "Welldone Metalworks",
  
      metaDescription:
        description ||
        "Industrial products and solutions.",
  
      metaKeywords:
        keywords.join(", "),
  
      openGraph: {
        title,
        description,
        image,
        url,
      },
  
      twitter: {
        card: "summary_large_image",
        title,
        description,
        image,
      },
    };
  };
  
  export default generateSEO;