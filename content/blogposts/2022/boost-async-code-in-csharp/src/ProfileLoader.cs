using System;
using System.Threading.Tasks;

namespace DavidKroell.BoostAsync;

public class ProfileLoader
{
    public async Task<Profile> GetProfileDetailsAsync(string userName)
    {
        var profile = await GetProfileMetaData(userName);

        profile.ProfilePicture = await GetProfilePicture(profile.UserId);
        profile.InstagramDetails = await GetInstagramDetailsAsync(profile.InstagramId);
        profile.GithubDetails = await GetGithubDetailsAsync(profile.GithubId);
        profile.LinkedInDetails = await GetLinkedInDetailsAsync(profile.LinkedInId);

        return profile;
    }

    public async Task<Profile> GetProfileDetailsFastAsync(string userName)
    {
        var profile = await GetProfileMetaData(userName);

        var profilePictureTask = GetProfilePicture(profile.UserId);
        var instagramDetailsTask = GetInstagramDetailsAsync(profile.InstagramId);
        var githubDetailsTask = GetGithubDetailsAsync(profile.GithubId);
        var linkedInDetailsTask = GetLinkedInDetailsAsync(profile.LinkedInId);
        
        // start all tasks in parallel and wait until all are completed
        await Task.WhenAll(profilePictureTask, instagramDetailsTask, githubDetailsTask, linkedInDetailsTask);
        
        // await here won't have to wait, because tasks are already completed
        profile.ProfilePicture = await profilePictureTask;
        profile.InstagramDetails = await instagramDetailsTask;
        profile.GithubDetails = await githubDetailsTask;
        profile.LinkedInDetails = await linkedInDetailsTask;

        return profile;
    }

    private async Task<Profile> GetProfileMetaData(string userName)
    {
        await Task.Delay(300);

        return new Profile(Guid.Parse("D01F475F-D4E2-415D-8B79-7100074C3892"),
            userName,
            "theawesome.squirrel@gmail.com",
            Guid.Parse("3E6EC3D4-DEDA-4CC6-918F-6892121AB2FA"),
            Guid.Parse("A59C7697-8E08-469B-B805-AA335EA3A45B"),
            Guid.Parse("E41FB48C-8809-443D-BACA-CDB1DE7CD59C"));
    }

    private async Task<byte[]> GetProfilePicture(Guid userId)
    {
        await Task.Delay(200);

        // load from disk
        return new byte[] { 0xde, 0xad, 0xbe, 0xef };
    }

    private async Task<InstagramDetails> GetInstagramDetailsAsync(Guid instagramId)
    {
        await Task.Delay(300);

        // retrieve from Instagram
        return new InstagramDetails(instagramId, 813, 632);
    }

    private async Task<GithubDetails> GetGithubDetailsAsync(Guid githubId)
    {
        await Task.Delay(150);

        // retrieve from GitHub
        return new GithubDetails(githubId, 548, 369);
    }

    private async Task<LinkedInDetails> GetLinkedInDetailsAsync(Guid linkedInId)
    {
        await Task.Delay(500);

        // retrieve from LinkedIn
        return new LinkedInDetails(linkedInId, 472);
    }
}