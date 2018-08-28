export class R900Protocol
{
	
    public static NULL_1:Uint8Array = new Uint8Array([0x0d, 0x0a]); 
    public static NULL_2:Uint8Array = new Uint8Array([0x0d]); 
    // { 0x0d };
	public static OPEN_INTERFACE_1 = new Uint8Array([0x0d, 0x0a, 0x0d, 0x0a, 0x0d, 0x0a, 0x0d, 0x0a]);
	// public static final byte[] OPEN_INTERFACE_2 = new byte[]
	// { 0x0d, 0x0d, 0x0d, 0x0d, 0x0d, 0x0d, 0x0d, 0x0d };

	// public static final byte[] BYE =
	// { 'b', 'y', 'e', 0x0d, 0x0a };
	// public static final int SKIP_PARAM = 0xffffffff;

	public static N_TYPE:number = 1;

	// ---
	public static CMD_INVENT:String = "I";
	public static CMD_STOP:String = "s";
	public static CMD_GET_VERSION:String = "ver";
	public static CMD_SET_DEF_PARAM:String = "Default";
	public static CMD_INVENT_PARAM:String = "Iparam";
	public static CMD_GET_PARAM:String = "g";
	public static CMD_SEL_MASK:String = "M";
	public static CMD_SET_TX_POWER:String = "Txp";
	public static CMD_GET_MAX_POWER:String = "Maxp";
	public static CMD_SET_TX_CYCLE:String = "Txc";
	public static CMD_CHANGE_CH_STATE:String = "Chs";
	public static CMD_SET_COUNTRY:String = "Cc";
	public static CMD_GET_COUNTRY_CAP:String = "ccap";
	public static CMD_READ_TAG_MEM:String = "R";
	public static CMD_WRITE_TAG_MEM:String = "W";
	public static CMD_KILL_TAG:String = "Kill";
	public static CMD_LOCK_TAG_MEM:String = "Lock";
	public static CMD_SET_LOCK_TAG_MEM:String = "lockperm";
	public static CMD_PAUSE_TX:String = "Pause";
	public static CMD_HEART_BEAT:String = "Online";
	public static CMD_STATUS_REPORT:String = "alert";
	public static CMD_INVENT_REPORT_FORMAT:String = "Ireport";
	public static CMD_SYSTEM_TIME:String = "Time";
    public static CMD_DISLINK:String = "bye"; 
    public static CMD_UPLOAD_TAG_DATA:String = "Br.upl";
	public static CMD_CLEAR_TAG_DATA:String = "Br.clrlist";
	public static CMD_ALERT_READER_STATUS:String = "Br.alert";
	public static CMD_GET_STATUS_WORD:String = "Br.sta";
	public static CMD_SET_BUZZER_VOL:String = "Br.vol";
	public static CMD_BEEP:String = "Br.beep";
	public static CMD_SET_AUTO_POWER_OFF_DELAY:String = "Br.autooff";
	public static CMD_GET_BATT_LEVEL:String = "Br.batt";
	public static CMD_REPORT_BATT_STATE:String = "Br.reportbatt";
	public static CMD_TURN_READER_OFF:String = "Br.off";
	public static CMD_READER_PROPRIETARY:String = "Br.bt.config";
	public static CMD_GET_BT_MAC_ADDRESS:String = "Br.bt.mac";

	public static tagErrorCodeToString( code:number ):String
	{
		switch( code )
		{
			case 0x00:
				return "general error";
			case 0x03:
				return "specified memory location does not exist or the PC value is not supported by the tag";
			case 0x04:
				return "specified memory location is locked and/or permalocked and is not writeable";
			case 0x0B:
				return "tag has insufficient power to perform the memory write";
			case 0x0F:
				return "tag does not support error-specific codes";
		}
		return "Unknown error";
	}

	public static moduleErrorCodeToString( code:number ):String
	{
		switch( code )
		{
			case 0x01:
				return "Read after write verify failed.";
			case 0x02:
				return "Problem transmitting tag command.";
			case 0x03:
				return "CRC error on tag response to a write.";
			case 0x04:
				return "CRC error on the read packet when verifying the write.";
			case 0x05:
				return "Maximum retry's on the write exceeded.";
			case 0x06:
				return "Failed waiting for read data from tag, possible timeout.";
			case 0x07:
				return "Failure requesting a new tag handle.";
			case 0x0A:
				return "Error waiting for tag response, possible timeout.";
			case 0x0B:
				return "CRC error on tag response to a kill.";
			case 0x0C:
				return "Problem transmitting 2nd half of tag kill.";
			case 0x0D:
				return "Tag responded with an invalid handle on first kill command.";
			case 0x0F:
				return "Bad Access Password.";
		}
		return "Internal Use";
	}

	public static setType( type:number )
	{
		if( type == 1 )
			this.N_TYPE = 1;
		else
        this.N_TYPE = 2;
	}

	public static getTypeSize()
	{
		if( this.N_TYPE == 1 )
			return 2;
		return 1;
	}

	public static getDelimeter()
	{
		if( this.N_TYPE == 1 )
			return "\r\n";
		return "\r";
	}

	public static getType()
	{
		if( this.N_TYPE == 1 )
			return this.NULL_1;
		return this.NULL_2;
	}

	// public static makeProtocol( cmd:String, param:Array<number> )
	// {
	// 	StringBuilder protocol = new StringBuilder();
	// 	protocol.append(cmd);

	// 	if( param != null && param.length > 0 )
	// 	{
	// 		for( int i = 0; i < param.length; ++i )
	// 		{
	// 			protocol.append(',');
	// 			if( param[ i ] != SKIP_PARAM )
	// 				protocol.append(param[ i ]);
	// 		}
	// 	}

	// 	return string2bytes( protocol.toString() );
	// }
	
	// public static final byte[] makeProtocol( String cmd )
	// {
	// 	StringBuilder protocol = new StringBuilder();
	// 	protocol.append(cmd);
	// 	return string2bytes( protocol.toString() );
	// }
	
	// //<-- eric 2012.12.12
	// public static final byte[] makeProtocol( String cmd, int[] param, String param1, String param2)
	// {
	// 	StringBuilder protocol = new StringBuilder();
	// 	protocol.append(cmd);
			
	// 	// param
	// 	if( param != null && param.length > 0)
	// 	{
	// 		for( int i=0; i<param.length; ++i)
	// 		{
	// 			protocol.append(',');
	// 			if( param[i] != SKIP_PARAM)
	// 				protocol.append(param[i]);				
	// 		}		
	// 	}
			
	// 	// param1
	// 	protocol.append( "," );
	
	// 	if( param1 != null )
	// 		protocol.append( param1 );
			
	// 	// param2
	// 	protocol.append( "," );
		
	// 	if( param1 != null )
	// 		protocol.append( param2 );	
		
	// 	return string2bytes( protocol.toString() );
	// }	

	
	// public static final byte[] makeProtocol( String cmd, String[] options )
	// {
	// 	StringBuilder protocol = new StringBuilder();
	// 	protocol.append(cmd);

	// 	if( options != null && options.length > 0)
	// 	{
	// 		for( int i = 0; i < options.length; ++i )
	// 		{
	// 			protocol.append( "," );
	// 			if( options[ i ] != null )
	// 				protocol.append( options[ i ] );
	// 		}
	// 	}
		
	// 	return string2bytes( protocol.toString() );
	// }
	
	// public static final byte[] makeProtocol( String cmd, int[] param, String[] options, int[] param2 )
	// {
	// 	StringBuilder protocol = new StringBuilder();
	// 	protocol.append(cmd);

	// 	if( param != null && param.length > 0 )
	// 	{
	// 		for( int i = 0; i < param.length; ++i )
	// 		{
	// 			protocol.append(',');
	// 			if( param[ i ] != SKIP_PARAM )
	// 				protocol.append(param[ i ]);
	// 		}
	// 	}
		
		
	// 	if( options != null )
	// 	{
	// 		for( int i = 0; i < options.length; ++i )
	// 		{
	// 			protocol.append( "," );
	// 			if( options[ i ] != null )
	// 				protocol.append( options[ i ] );
	// 		}
	// 	}
		
	// 	if( param2 != null && param2.length > 0 )
	// 	{
	// 		for( int i = 0; i < param2.length; ++i )
	// 		{
	// 			protocol.append(',');
	// 			if( param2[ i ] != SKIP_PARAM )
	// 				protocol.append(param2[ i ]);
	// 		}
	// 	}
		
	// 	return string2bytes( protocol.toString() );
	// }
	
	// public static final byte[] makeProtocol( String cmd, int[] param, String option, int[] param2 )
	// {
	// 	StringBuilder protocol = new StringBuilder();
	// 	protocol.append(cmd);

	// 	if( param != null && param.length > 0 )
	// 	{
	// 		for( int i = 0; i < param.length; ++i )
	// 		{
	// 			protocol.append(',');
	// 			if( param[ i ] != SKIP_PARAM )
	// 				protocol.append(param[ i ]);
	// 		}
	// 	}
		
	// 	protocol.append( "," );
	// 	if( option != null )
	// 		protocol.append( option );
		
	// 	if( param2 != null && param2.length > 0 )
	// 	{
	// 		for( int i = 0; i < param2.length; ++i )
	// 		{
	// 			protocol.append(',');
	// 			if( param2[ i ] != SKIP_PARAM )
	// 				protocol.append(param2[ i ]);
	// 		}
	// 	}
		
	// 	return string2bytes( protocol.toString() );
	// }
	
	// public static final byte[] makeProtocol( String cmd, String option, int[] param2 )
	// {
	// 	StringBuilder protocol = new StringBuilder();
	// 	protocol.append(cmd);

	// 	protocol.append( "," );
	// 	if( option != null )
	// 		protocol.append( option );
		
	// 	if( param2 != null && param2.length > 0 )
	// 	{
	// 		for( int i = 0; i < param2.length; ++i )
	// 		{
	// 			protocol.append(',');
	// 			if( param2[ i ] != SKIP_PARAM )
	// 				protocol.append(param2[ i ]);
	// 		}
	// 	}
		
	// 	return string2bytes( protocol.toString() );
	// }
	
	// public static final byte[] string2bytes( String str )
	// {
	// 	char[] charProtocol = str.toCharArray();
	// 	byte[] byteProtocol = new byte[charProtocol.length + getTypeSize()];
	// 	int index = 0;
	// 	for( int i = 0; i < charProtocol.length; ++i, ++index )
	// 		byteProtocol[ index ] = (byte) ( charProtocol[ i ] & 0xff );

	// 	// ---
	// 	for( int i = 0; i < getTypeSize(); ++i, ++index )
	// 		byteProtocol[ index ] = getType()[ i ];

	// 	return byteProtocol;
	// }
}