import { Divider, Grid, Typography } from "@mui/material";

const Privacy = () => {
  return (
    <Grid
      container
      item
      flexDirection="column"
      gap={3}
      sx={{
        p: { md: "4rem", xs: "1rem" },
        background: "#E5E5E5",
      }}
    >
      <Grid
        item
        container
        flexDirection="column"
        sx={{
          background: "#fff",
          p: { md: 6, xs: 2, sm: 3 },
          borderRadius: { md: "2rem", xs: "1rem" },
        }}
      >
        <Typography
          sx={{
            color: "#5F5C5C",
            fontSize: { md: "2.5rem", xs: "1.8rem", sm: "2rem" },
          }}
          fontWeight={700}
        >
          Privacy Policy
        </Typography>
        <Divider flexItem sx={{ borderWidth: "2px", borderColor: "#FF9B04" }} />
        <Typography
          sx={{
            mt: 4,
            color: "#5F5C5C",
            textAlign: "justify",
            fontSize: { md: "1.8rem", xs: "1.2rem", sm: "1rem" },
          }}
          fontWeight={500}
        >
          You agree, by your use of this forum, that you will not post any
          material which is false, defamatory, inaccurate, abusive, vulgar,
          hateful, harassing, obscene, profane, sexually offensive, threatening,
          invasive of a person's privacy, pornographic or otherwise in violation
          of any International Law, the Laws of the Federal Republic of Nigeria
          or the law in force in your local jurisdiction. You also agree not to
          post any copyrighted material unless you own the copyright or you have
          written consent from the owner of the copyrighted material. Spam,
          flooding, advertisements, chain letters, pyramid schemes, and
          solicitations are also prohibited on this forum. Note that it is
          impossible for the staff or the owners of this forum to confirm the
          validity of posts. Please remember that we do not actively monitor the
          posted messages, and as such, are not responsible for the content of
          such. We do not guarantee the accuracy, completeness, or usefulness of
          any information presented. The posted messages express the views of
          the author and not necessarily the views of this forum, its staff,
          subsidiaries or privies. Anyone who believes that a content on the
          forum is in violation of Our Community Guidelines is advised to notify
          an Administrator or Moderator immediately. Ceetok reserves the right
          to remove such content, within a reasonable time frame, if they
          determine that removal is necessary. This is a manual process,
          however, please realize that they may not be able to remove or edit
          particular messages immediately. This policy applies to members'
          profile information as well. You remain solely responsible for the
          content of your posted messages. Furthermore, you agree to indemnify
          and hold harmless Ceetok, any related websites to this forum, its
          staff, its subsidiaries and privies. The forum also reserve the right
          to reveal your identity (or any other related information collected on
          this service) in the event of a formal complaint or legal action
          arising from any situation caused by your use of this forum. This
          however can only be released upon a valid Court Order made by a court
          of competent jurisdiction. You have the ability, as you register, to
          choose your username. We advise that you use a name that you can
          easily remember. With this user account you are about to register, you
          agree to never give your password out to another person except an
          administrator, for your protection and for validity reasons. You also
          agree to NEVER use another person's account for any reason. We also
          HIGHLY recommend you use a complex and unique characters in setting up
          your password to prevent account theft. After you register and login
          to this forum, you will be able to fill out a detailed profile. It is
          your responsibility to supply accurate information upon registration
          and hereby covenants to do so. Sanctions arising from false
          declarations shall be borne solely by the defaulting member. Please
          note that with each post, your IP address is recorded, in the event
          that you need to be banned from this forum or your ISP contacted. This
          will only happen in the event of a major violation of this agreement.
          Also note that the software places a cookie, a text file containing
          bits of information (such as your username and password), in your
          browser's cache. This is ONLY used to keep you logged in/out. The
          software does not collect or send any other form of information to
          your computer.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Privacy;
