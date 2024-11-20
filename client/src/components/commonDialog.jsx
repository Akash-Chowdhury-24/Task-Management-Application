import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CommonForm from './commonForm';
import { useContext } from 'react';
import { TaskManagmentContext } from '../context/taskManagementContext';

function CommonDialog({
  showDialog,
  setShowDialog,
  title,
  formcontrol = [],
  btnText,
  formData,
  setFormData,
  handleSubmit,
}) {

  const {currentEditedTaskId,setCurrentEditedTaskId} = useContext(TaskManagmentContext);
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
          setCurrentEditedTaskId(null);
        }}
        sx={{
          '& .MuiPaper-root': { 
            maxWidth: { xs: '95%', sm: '600px' }, 
            width: '100%', 
            padding: { xs: '15px', sm: '20px' }, 
            borderRadius: '10px', 
            backgroundColor: 'rgba(0, 0, 0, 0.750)',
            placeItems: 'center',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Smaller font size on mobile
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom: '10px',
            color: 'white',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            padding: { xs: '5px', sm: '15px' }, 
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            maxHeight: { xs: '60vh', sm: '400px' }, 
          }}
        >
          <CommonForm
            formcontrol={formcontrol}
            btnText={btnText}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CommonDialog;
