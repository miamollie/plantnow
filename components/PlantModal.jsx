import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export default function PlantModal({
  open,
  plant: { name, botanicalName, hint, harvest },
  handleClose,
}) {
  const kebabName = name.toLowerCase().replace(" ", "-");
  const classes = useStyles();

  return (
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
            <Typography gutterBottom variant="h4">
              HARVEST:
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
  );
}

const useStyles = makeStyles((theme) => ({
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
    backgroundRepeat: "no-repeat",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});
