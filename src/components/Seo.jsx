import { getImage } from "helpers";
import { Helmet } from "react-helmet-async";
import parse from "html-react-parser";
const Seo = ({ title, description, name, type, image }) => {
  return (
    <>
      <Helmet>
        {/* Standard metadata tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* End standard metadata tags */}
        {/* Facebook tags */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={parse(description)} />
        {/* End Facebook tags */}
        {/* Twitter tags */}
        <meta name="twitter:creator" content={name} />
        <meta name="twitter:card" content={type} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {/* End Twitter tags */}
        <link rel="icon" href={getImage(image)} />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={getImage(image)}
        />
      </Helmet>
    </>
  );
};
export default Seo;
