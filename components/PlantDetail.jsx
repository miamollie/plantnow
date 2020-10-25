import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grow from "@material-ui/core/Grow";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export default function PlantDetail({
  plant: { name, imgUrl, botanicalName, hint, harvest },
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const kebabName = name.toLowerCase().replace(" ", "-")

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Card className={classes.root} component="article" onClick={handleOpen}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt=""
            role="presentation"
            image={imgUrl}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby={`${kebabName}-alert-dialog-title`}
        aria-describedby={`${kebabName}-alert-dialog-description`}
      >
        <DialogTitle id={`${kebabName}-alert-dialog-title`}>
          {name}{" "}
          <IconButton onClick={handleClose} ara-label="Close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>Botanical Name: {botanicalName}</Typography>
            <br />
            <Typography>When to harvest: {harvest}</Typography>
            <br />
            <Typography>
              <EmojiObjectsIcon /> Hint: {hint}
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 180,
    marginBottom: 30,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});
