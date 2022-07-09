import React from 'react'
import clsx from 'clsx'
import { 
    useSelector,
} from 'react-redux'
import {
  getSignedUrl,
} from '../../redux/attachments/actions'
import {
  makeStyles,
} from '@material-ui/core/'
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  viewAttachment: {
    position: "relative",
    // padding: theme.spacing(),
  },
  thumbnail:{
    width: '100%',
    borderRadius: theme.spacing(3),
  },
  closeButton:{
    position: 'absolute',
    top: "2.5%",
    right: "2.5%",
    backgroundColor: "#FFF",
    borderRadius: "50%",
  },
}))

const deleteAttachment = (onAttachmentDelete, onFormUpdate, key) => {
  onAttachmentDelete(key)
  onFormUpdate([], [key])
}

export default function ViewAttachment(props) {
  
	const classes = useStyles()
  const {
    url,
  } = props
  const attachmentsSlice = useSelector(state => state.attachments)
  const {
    attachments,
  } = attachmentsSlice
  let signedUrl = null
  for (const key in attachments) {
    if (key === url){
      signedUrl = attachments[key]
    }
  }
  React.useEffect(() => {
    getSignedUrl(url)
  }, [url])

	return	<div className={clsx(classes.viewAttachment)} >
            { !signedUrl ? <div>loading...</div> : 
                <div className={clsx(classes.none)}>
                  <img 
                     className={clsx(classes.thumbnail)}
                     src={ signedUrl } 
                     alt={`Attachment`} 
                  />
                  <CancelIcon 
                    className={(classes.closeButton)}
                    color="primary" 
                    onClick={() => (deleteAttachment(
                      props.onAttachmentDelete,
                      props.onFormChange, 
                      url)
                    )}/>
                </div>
            }
          </div>
}
