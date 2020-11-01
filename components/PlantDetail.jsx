import { makeStyles } from "@material-ui/core/styles";
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
    // Todo this whole thing should be a button or have an accessibility CTA, need to be tabbable
    <>
      <figure className={classes.card} onClick={handleOpen}>
        <div className={classes.cardContent}>
          <img
            alt=""
            role="presentation"
            className={classes.cardImage}
            src={imgUrl}
            alt=""
          />
          <Typography gutterBottom variant="h5" component="h2" align="right">
            {name.toUpperCase()}
          </Typography>
        </div>

        <figcaption className={classes.cardCaption}>
          <Typography className={classes.cardCaptionCTA}>Read More</Typography>
        </figcaption>
      </figure>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby={`${kebabName}-alert-dialog-title`}
        aria-describedby={`${kebabName}-alert-dialog-description`}
      >
        <div className={classes.dialogContents}>
          <div className={classes.dialogContentsImageWrapper}>
            <div className={classes.dialogContentsImage}></div>
          </div>
          <section className={classes.dialogContentsText}>
            <Typography
              gutterBottom
              variant="h3"
              id={`${kebabName}-alert-dialog-title`}
            >
              {name.toUpperCase()}
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
          <div className={classes.dialogButton}>
            <IconButton size="small" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </Dialog>
    </>
  );
}

  const useStyles = makeStyles((theme) => ({
  card: {
    margin: 0,
    position: "relative",
    overflow: "hidden",
    width: "200px",
    height: "200px",
    backgroundColor: "white",
    cursor: "pointer",
    transition: "box-shadow ease 0.35s",
    "&:hover, &:focus": {
      boxShadow: "-1px 1px 10px -5px #444",
      outline: "none",
    },
    "&:hover $cardCaption": {
      transform: "translate3d(0, -50%,0)",
    },
    "&:hover $cardCaptionCTA": {
      transitionDelay: "0.05s",
      opacity: 1,
    },
    [theme.breakpoints.down("xs")]: {
      width: "80vw",
      height: "125px",
      flexDirection: "row",
      alignItems: "baseline",
    },
  },
  cardImage: {
    margin: "auto",
  },
  cardContent: {
    padding: "16px 16px 24px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
      alignItems: "baseline",
    },
  },
  cardCaption: {
    top: "auto",
    bottom: 0,
    height: "3.75em",
    background: "#fff",
    color: "#000",
    textTransform: "uppercase",
    backfaceVisibility: "hidden",
    transition: "transform 0.35s",
    transform: "translate3d(0,100%,0)",
  },
  cardCaptionCTA: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    transition: "opacity 0.35s",
    backfaceVisibility: "hidden",
    margin: 0,
    paddingLeft: "10px",
  },
  dialogContents: {
    display: "flex",
    alignItems: "stretch",
    position: "relative",
  },
  dialogButton: { padding: "10px" },
  dialogContentsText: {
    padding: "60px 30px",
    flex: 1,
  },
  dialogContentsImageWrapper: {
    flex: 0.5,
    backgroundColor: theme.palette.secondary.main,
    position: "relative",
  },
  dialogContentsImage: {
    position: "absolute",
    height: "50%",
    width: "100%",
    bottom: 0,
    backgroundImage: "url('/static/detailLeaf.png')",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});
