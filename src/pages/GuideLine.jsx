import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const GuideLine = () => {
  const regulations = [
    {
      Dos: "Verify your information for authenticity/accuracy before posting it on forum naija. You are solely responsible for any news you post in this forum.",
      Donts: "Do not post false information or unverified reports.",
    },
    {
      Dos: "Be respectful and courteous to other members of forum naija. This includes respecting their personality, family, race, ethnicity, religious and political leaning etc.",
      Donts:
        "Do not insult, disrespect or bully other forum members in anyway whatsoever, under any guise.",
    },

    {
      Dos: " Ensure your threads are posted in the appropriate sections in line with the rules of the forum.",
      Donts:
        "Do not create unnecessary distractions by posting topics in the wrong sections",
    },

    {
      Dos: "Comments on a thread should be about the topic/subject of discussion",
      Donts:
        "Do not derail a discussion on a subject matter, in other words, do not post outside a subject. (You're rather advised to open a seperate thread for the new topic). ",
    },
    {
      Dos: "Post contents that can be viewed from anywhere at anytime without the user worrying about offending someone at work in a public place, at home etc",
      Donts:
        "Ponographic, obscene and violent contents are prohibited from this forum",
    },
    {
      Dos: "Respect the privacy of other members. Ensure you get permission to post any personal information of any member of this forum",
      Donts:
        "Do not post personal information of any member without their consent first sought and obtained.",
    },
    {
      Dos: "Headlines should match the body of the message. Also add viewers discretion when posting graphic contents",

      Donts:
        "Do not create a headline that is different from the body of the message",
    },
    {
      Dos: " Be sure to give credit to the original author of any thread or posts you make.",

      Donts:
        " Do not plagiarize. Plagiarism is a serious offence and you're responsible for any such post(s)",
    },
  ];

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
          Our Community Guidelines
        </Typography>
        <Divider flexItem sx={{ borderWidth: "2px", borderColor: "#FF9B04" }} />
        <Typography
          sx={{
            mt: 4,
            color: "#5F5C5C",
            fontSize: { md: "1.8rem", xs: "1.2rem", sm: "1rem" },
          }}
          fontWeight={700}
        >
          DOs & Don'ts{" "}
        </Typography>

        {
          <List component="ol">
            {regulations.map((regulation, index) => (
              <ListItem disableGutters disablePadding key={index}>
                <ListItemText
                  primary={
                    <Typography
                      fontWeight={600}
                      fontSize={{ md: "1.8rem", xs: "1rem" }}
                    >
                      Dos:
                      <Typography variant="span" fontWeight={400}>
                        {regulation.Dos}
                      </Typography>
                    </Typography>
                  }
                  secondary={
                    <Typography
                      fontSize={{ md: "1.8rem", xs: "1rem" }}
                      fontWeight={600}
                    >
                      Dont:
                      <Typography variant="span" fontWeight={400}>
                        {regulation.Donts}
                      </Typography>
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            <ListItem disableGutters>
              <ListItemText
                primary="CAVEAT"
                secondaryTypographyProps={{
                  fontSize: { md: "1.8rem", xs: "1rem" },
                }}
                primaryTypographyProps={{ fontWeight: 700 }}
                secondary="Use of ceetok for illegal activities of any kind is prohibited. Any activities that goes against the laws of Nigeria will not be tolerated"
              />
            </ListItem>
          </List>
        }
      </Grid>
    </Grid>
  );
};

export default GuideLine;
