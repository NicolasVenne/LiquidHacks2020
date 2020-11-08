import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { useFirebase, useUser } from '../context/firebase'
import {getServerUrl} from '../context/server-url'

//on button click
//start timer
//add player to queue
//while players in current lobby < 10
    //compare rank with other queued players
    //get players queuing up
//fill team queue and enemy queue
//post room code and host

// export default matchInfo