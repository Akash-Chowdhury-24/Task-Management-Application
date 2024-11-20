import { Card, CardContent, Typography, Button, CardActions, autocompleteClasses } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { scrumBoard } from "../../config";


function SingleTaskItem({ taskItem, handleDelete, setShowDialog, setCurrentEditedTaskId, setTaskFromData }) {
  const { title, description, priority, status, hours, minutes } = taskItem;
  const [timerHour,setTimerHour]=useState(hours);
  const [timerMinute,setTimerMinute]=useState(minutes);

  const timerIdRef = useRef(null);

  useEffect(() => {
    if (status !== 'done') {
      const countdown = () => {
        if (timerHour === 0 && timerMinute === 0) {
          setTimerHour(hours);
          setTimerMinute(minutes);
        } else if (timerMinute === 0 && timerHour > 0) {
          setTimerHour((prevHour) => prevHour - 1);
          setTimerMinute(59);
        } else {
          setTimerMinute((prevMinute) => prevMinute - 1);
        }
      };

      if (timerHour === 0 && timerMinute === 0) {
        countdown();
      } else {
        if (timerIdRef.current) {
          clearTimeout(timerIdRef.current);
        }
        timerIdRef.current = setTimeout(countdown, 60000); 
      }
      return () => clearTimeout(timerIdRef.current);
    }
  }, [status, timerHour, timerMinute, hours, minutes]);


  return (
    <Card sx={{
      maxWidth: { xs: '90%', sm: 345 },
      margin: {
        xs: '10px',
        sm: '20px',
      },
      padding: { xs: "10px", sm: "15px" },
      backgroundColor: "#ffffff87",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 1,
      fontFamily: "NotoSerifJP, serif",


    }}>
      <CardContent sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        minHeight: 150,
        width: '100%',
      }}>
        {/* Title */}
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            maxWidth: '300px',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            textAlign: 'center',
            maxHeight: '4.5em',
            overflowY: 'auto',
            fontFamily: "NotoSerifJP, serif",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }} // ensures title remains in one line with ellipsis if it's too long
        >
          {title}
        </Typography>


        {/* Description - allow multi-line wrap */}
        <Typography
          variant="h8"
          color="text.secondary"
          sx={{
            width: '100%',
            maxWidth: '300px',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            textAlign: 'center',
            maxHeight: '4.5em',
            overflow: 'auto',
            lineHeight: 1.2,
            fontFamily: "NotoSerifJP, serif",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {description}
        </Typography>

        {/* Status */}
        <Typography variant="body" color="text.primary" sx={{ fontFamily: "NotoSerifJP, serif", marginTop: "5px", }}>
          <strong>Status:</strong> {scrumBoard.find(boardOption => boardOption.id === status).label}
        </Typography>

        {/* Priority */}
        <Typography variant="body" color={priority === "high" ? "error.main" : priority === "medium" ? "warning.main" : "text.secondary"}
          sx={{
            fontFamily: "NotoSerifJP, serif",
            marginTop: "5px",
          }}>
          <strong>Priority:</strong> {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Typography>
        {/* Remainder time */}
        <Typography variant="body" color="text.primary" sx={{ fontFamily: "NotoSerifJP, serif", marginTop: "5px", }}>
          {
            status === 'done' ? <strong>--hours --mins</strong> : <strong>{timerHour}hrs {timerMinute}mins</strong>
          }
        </Typography>

      </CardContent>

      {/* Card Actions */}
      <CardActions sx={{ display: "flex", justifyContent: "flex-end", height: "auto" }}>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          sx={{
            marginRight: "10px",
            color: "rgb(59, 50, 50);",
            border: "2px solid rgb(59, 50, 50)",
            fontFamily: "NotoSerifJP, serif",
            fontSize: "1rem",
            '&:hover':
            {
              transform: "scale(1.05)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
            }
          }}
          onClick={() => {
            setShowDialog(true);
            setCurrentEditedTaskId(taskItem._id);
            setTaskFromData({
              title: taskItem.title,
              description: taskItem.description,
              priority: taskItem.priority,
              status: taskItem.status,
              hours: taskItem.hours,
              minutes: taskItem.minutes,
            });
          }}>
          Edit
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => { handleDelete(taskItem._id) }}
          sx={{
            backgroundColor: "rgb(59, 50, 50);",
            color: "white",
            fontFamily: "NotoSerifJP, serif",
            fontSize: "1rem",
            '&:hover':
            {
              backgroundColor: "rgb(39, 36, 36)",
              transform: "scale(1.05)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
            }
          }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default SingleTaskItem;