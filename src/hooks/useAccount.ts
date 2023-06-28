import { useEffect, useState } from 'react'
import {getAccountPassword} from "../utils/account";
import {useSearchParams} from "react-router-dom";
import {getEncryptedAccount} from "../utils/storage";
import Web3, { Web3BaseWalletAccount } from "web3";

const web3 = new Web3()

function useAccount() {
  const [searchParams] = useSearchParams()
  const secret = searchParams.get('secret') || ''
  const username = searchParams.get('username') || ''
  const [userAccount, setUserAccount] = useState<Web3BaseWalletAccount>()

  useEffect(() => {
    const decodeAccount = async () => {
      const password = getAccountPassword(secret, username)
      const accData = getEncryptedAccount()
      if(accData) {
        const decodedData = await web3.eth.accounts.decrypt(JSON.parse(accData), password)
        if(decodedData) {
          setUserAccount(decodedData)
        }
      }
    }
    decodeAccount()
  }, [secret, username])

  return userAccount
}

export default useAccount