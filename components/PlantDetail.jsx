import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export default function PlantDetail({
  plant: { name, imgUrl, botanicalName, hint, harvest },
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const kebabName = name.toLowerCase().replace(" ", "-");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <article
        className={classes.card}
        component="article"
        onClick={handleOpen}
      >
        <img
          className={classes.cardImage}
          alt=""
          role="presentation"
          src={imgUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="right">
            {name.toUpperCase()}
          </Typography>
        </CardContent>
      </article>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby={`${kebabName}-alert-dialog-title`}
        aria-describedby={`${kebabName}-alert-dialog-description`}
      >
        <div className={classes.dialogContents}>
          <div className={classes.dialogContentsImage}></div>
          <section className={classes.dialogContentsText}>
            <Typography
              gutterBottom
              variant="h3"
              id={`${kebabName}-alert-dialog-title`}
            >
              {name.toUpperCase()}
              {/* <IconButton onClick={handleClose} ara-label="Close">
            <CloseIcon />
          </IconButton> */}
            </Typography>
            <Box id={`${kebabName}-alert-dialog-description`}>
              <Typography variant="h5" gutterBottom>
                Botanical Name: {botanicalName}
              </Typography>
              <Typography gutterBottom>{harvest}</Typography>
              <Typography gutterBottom variant="h4">
                HINT:
              </Typography>
              <Typography gutterBottom>{hint}</Typography>
            </Box>
          </section>
        </div>
      </Dialog>
    </>
  );
}

//todo take index and choose from 4 colours (red greden blue yellow?) and pop a leaf here too and close button should be same colour
//todo hover effect?
const useStyles = makeStyles((theme) => ({
  card: {
    width: "200px",
    height: "200px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      width: "80vw",
      height: "100px",
      flexDirection: "row",
      alignItems: "baseline",
    },
  },
  cardImage: {
    margin: "auto",
  },
  dialogContents: {
    display: "flex",
    alignItems: "stretch",
  },
  dialogContentsText: {
    padding: "60px 30px",
    flex: 1,
  },
  dialogContentsImage: {
    flex: 0.5,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});
