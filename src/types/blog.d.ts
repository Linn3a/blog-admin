export interface IUser {
    id:         uint     
	username:   string    
	password:   string    
	avatar:     string    
	desc:       string   
	gender:     uint    
	is_admin:   boolean      
	birthday:   time.Time 
	last_login: time.Time 
    created_at: time.Time
}

export interface ICategory {
    id:        uint
    name:      string
    cover:     string
    tags:      ITag[]
    passages:  IPassage[]
}

export interface ITag {
    id:        uint
    name:      string
    color:     string
}

export interface IComment {
    id:        uint
    content:   string
    create_at: time.Time
    user_id:   uint
    username:  string
}

export interface IPassage {
    id:        uint    
	title:     string   
	content:   string  
	desc:      string   
	CreatedAt: time.Time
	cate_id:   int
    cate_name: string
    tags:      ITag[]     
    comments:  IComment[] 
}

