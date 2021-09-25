import ReactPlayer from "react-player"
import Dialog from "@mui/material/Dialog"
import { DialogActions, DialogTitle, Button } from "@material-ui/core"
import CancelIcon from "@mui/icons-material/Cancel"

const PreviewModal = ({ showModal, setShowModal, preview }) => {
  return (
    <Dialog open={showModal} onClose={() => setShowModal(!showModal)}>
      <DialogTitle>{"Course Preview"}</DialogTitle>
      <div className="wrapper">
        <ReactPlayer
          url={preview}
          playing={showModal}
          controls={true}
          width="100%"
          height="100%"
        />{" "}
      </div>
      <DialogActions>
        <Button onClick={() => setShowModal(!showModal)}>
          <CancelIcon style={{ marginRight: "0.25rem" }} />
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PreviewModal
