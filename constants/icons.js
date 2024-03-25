import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "./theme";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"



export const Back = ({style, color, size, onPress}) => <Ionicons name="arrow-back-outline" size={size} color={color} style={style} onPress={onPress}/>;
export const Person = <Ionicons name="person-outline" size={20} color="#717171" light />;
export const User = <Ionicons name="user" size={25} color="#717171" light />;
export const Notification = <Ionicons name="notifications-outline" size={20} color="#717171" light />;
export const TicketIcon = <Ionicons name="qr-code-outline" size={20} color="#717171" light />;s
export const Warning= ({style}) => <Ionicons name="ios-warning-outline" size={20} color="#717171" style={style} light />;
export const Chat = <Ionicons name="chatbubble" size={20} color="#717171" light />;
export const News = <Ionicons name="newspaper" size={25} color="#717171" />;
export const Calendar = <Ionicons name="calendar-check" size={25} color="#717171" />;
export const Ad = <Ionicons name="ad" size={20} color="#717171"/>;
export const Direction = <Ionicons name="ios-chevron-forward-outline" size={20} color="#717171" style={{paddingTop: 20}}/>;
export const Icon =({name, size, style, color, onPress})=><Ionicons name={name} size={size} color={color} style={style} onPress={onPress}/>
export const ScanTicket = <Ionicons name="scan-outline" size={20} color="#717171" light/>
export const Campaign = <Ionicons name="megaphone-outline" size={20} color="#717171" light/>

export const Calendars = <Ionicons name="calendar-outline" size={25} color="#717171" light style={{marginTop: 10,}}/>
export const Time =  ({size})=> <Ionicons name="time-outline" size={size} color="#717171" light  style={{marginTop:10,}}/>
export const Close = ({style, color})=><Ionicons name="close-circle" size={25} color={color} style={style} light/>
export const Exit = ({style, color, size, onPress})=><Ionicons name="close-outline" size={size} color={color} style={style} onPress={onPress}/>
export const Location = <Ionicons name="location-outline" size={16} color="#000" light />
export const FilterOutline =({style, color, size, onPress})=><Ionicons name="menu" size={size} color={color} style={style} onPress={onPress}/>
export const Eye= ({icon}) => <Ionicons name={icon === "true" ? "eye-off" : "eye"} size={25} color="#717171"/>
export const EyeOff= ({icon}) => <Ionicons name="eye-off" size={25} color="#717171"/>
export const Man = <Ionicons name="man-outline" size={20} color={COLORS.gray} />
export const School = <Ionicons name="school-outline" size={20} color={COLORS.gray} />
export const Home = <Ionicons name="home-outline" size={20} color={COLORS.gray} />
export const Mark = ({style, size}) => <Ionicons name="checkmark-circle-outline" size={size} color={COLORS.lightgreen} style={style} />
export const ChevUp = () =><Ionicons name="chevron-up-outline"size={20} color={COLORS.gray} />
export const ChevDown = (style) => <Ionicons name="chevron-down-outline"size={20} color={COLORS.gray} style={style} />
export const CalendarOutline = <Ionicons name="calendar" size={20} color="#717171" light/>
export const Analytics = <Ionicons name="analytics" size={20} color="#717171" light/>
export const BookOutline = <Ionicons name="book-outline" size={20} color="#717171" light/>
export const Remove = <Ionicons name="remove-circle" size={20} color="#C3C3C3" light/>
export const Logout = <Ionicons name="log-out-sharp" size={20} color="#C3C3C3" light/>







// Font Awesome6
export const ReusableIcon =({name, size, style, color, onPress})=><FontAwesome6 name={name} size={size} color={color} style={style} onPress={onPress}/>
